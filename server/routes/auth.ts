import { Router } from 'express';
import { db, schema } from '../db/index.ts';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.ts';
import { generateId, hashPassword, comparePassword } from '../utils/crypto.ts';
import { authenticate } from '../middleware/auth.ts';
import { authRateLimit } from '../middleware/rateLimit.ts';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  orgName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  mfaCode: z.string().optional(),
});

const generateTokens = (userId: string, email: string, role: string, orgId?: string | null) => {
  const accessToken = jwt.sign({ userId, email, role, orgId }, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as any);
  const refreshToken = jwt.sign({ userId, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as any);
  return { accessToken, refreshToken, expiresIn: 900 };
};

router.post('/register', authRateLimit, async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const [existing] = await db.select().from(schema.users).where(eq(schema.users.email, data.email)).limit(1);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    const [existingUsername] = await db.select().from(schema.users).where(eq(schema.users.username, data.username)).limit(1);
    if (existingUsername) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    let orgId: string | null = null;
    if (data.orgName) {
      orgId = generateId('org');
      await db.insert(schema.organizations).values({
        id: orgId,
        name: data.orgName,
        slug: data.orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      }).run();
    }

    const userId = generateId('usr');
    const passwordHash = await hashPassword(data.password);
    await db.insert(schema.users).values({
      id: userId,
      email: data.email,
      username: data.username,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      passwordHash,
      role: 'analyst',
      orgId,
      isActive: true,
      mfaEnabled: false,
    }).run();

    const tokens = generateTokens(userId, data.email, 'analyst', orgId);
    res.status(201).json({ success: true, data: { user: { id: userId, email: data.email, username: data.username, role: 'analyst' }, ...tokens } });
  } catch (error) {
    next(error);
  }
});

router.post('/login', authRateLimit, async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, data.email)).limit(1);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const valid = await comparePassword(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    if (user.mfaEnabled && env.ENABLE_MFA) {
      if (!data.mfaCode) {
        return res.status(200).json({ success: true, data: { mfaRequired: true } });
      }
      const verified = authenticator.verify({ token: data.mfaCode, secret: user.mfaSecret! });
      if (!verified) {
        return res.status(401).json({ success: false, error: 'Invalid MFA code' });
      }
    }
    await db.update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, user.id)).run();
    const tokens = generateTokens(user.id, user.email, user.role, user.orgId);
    res.json({ success: true, data: { user: { id: user.id, email: user.email, username: user.username, role: user.role, orgId: user.orgId }, ...tokens } });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, error: 'Refresh token required' });
    }
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as any;
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, payload.userId)).limit(1);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
    const tokens = generateTokens(user.id, user.email, user.role, user.orgId);
    res.json({ success: true, data: tokens });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authenticate, (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

router.post('/mfa/setup', authenticate, async (req, res, next) => {
  try {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(req.user!.email, 'ProofShield', secret);
    const qrCode = await QRCode.toDataURL(otpauth);
    await db.update(schema.users).set({ mfaSecret: secret }).where(eq(schema.users.id, req.user!.id)).run();
    res.json({ success: true, data: { secret, qrCode } });
  } catch (error) {
    next(error);
  }
});

router.post('/mfa/verify', authenticate, async (req, res, next) => {
  try {
    const { code } = req.body;
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, req.user!.id)).limit(1);
    if (!user || !user.mfaSecret) {
      return res.status(400).json({ success: false, error: 'MFA not setup' });
    }
    const verified = authenticator.verify({ token: code, secret: user.mfaSecret });
    if (!verified) {
      return res.status(400).json({ success: false, error: 'Invalid code' });
    }
    await db.update(schema.users).set({ mfaEnabled: true }).where(eq(schema.users.id, user.id)).run();
    res.json({ success: true, message: 'MFA enabled' });
  } catch (error) {
    next(error);
  }
});

export default router;
