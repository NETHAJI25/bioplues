import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { env } from '../config/env.ts';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateId = (prefix = ''): string => {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
};

export const generateApiKey = (): { key: string; hash: string; prefix: string } => {
  const random = crypto.randomBytes(32).toString('hex');
  const key = `${env.API_KEY_PREFIX}${random}`;
  const prefix = key.substring(0, 12);
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  return { key, hash, prefix };
};

export const hashApiKey = (key: string): string => {
  return crypto.createHash('sha256').update(key).digest('hex');
};

export const randomHex = (bytes = 16): string => {
  return crypto.randomBytes(bytes).toString('hex');
};
