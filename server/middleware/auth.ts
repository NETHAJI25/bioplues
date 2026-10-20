import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.ts';
import type { JwtPayload, AuthUser } from '../types/index.ts';
import { db, schema } from '../db/index.ts';
import { eq } from 'drizzle-orm';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const [user] = await db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
        role: schema.users.role,
        orgId: schema.users.orgId,
        mfaEnabled: schema.users.mfaEnabled,
        isActive: schema.users.isActive,
      })
      .from(schema.users)
      .where(eq(schema.users.id, payload.userId))
      .limit(1);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role as any,
      orgId: user.orgId,
      mfaEnabled: Boolean(user.mfaEnabled),
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    next();
  };
};
