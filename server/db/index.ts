import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.ts';
import { env } from '../config/env.ts';
import path from 'path';
import fs from 'fs';

const dbPath = env.DATABASE_URL.replace('file:', '');
const dataDir = path.dirname(dbPath);

if (dataDir && dataDir !== '.') {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
export { schema };
export { sqlite };
