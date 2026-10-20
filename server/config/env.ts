import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string().optional().default('file:./data.db'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default('proofshield-super-secret-key-change-in-production-min-32-chars'),
  JWT_REFRESH_SECRET: z.string().min(32).default('proofshield-refresh-super-secret-key-change-in-production-min-32-chars'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  API_KEY_PREFIX: z.string().default('psk_'),
  ENABLE_SAFE_SCANS_ONLY: z.coerce.boolean().default(true),
  MAX_SCAN_DURATION_HOURS: z.coerce.number().positive().default(24),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  ENABLE_MFA: z.coerce.boolean().default(true),
  ENABLE_WEBSOCKET: z.coerce.boolean().default(true),
  PROMETHEUS_ENABLED: z.coerce.boolean().default(true),
  AI_ENABLED: z.coerce.boolean().default(true),
  NVD_API_KEY: z.string().optional(),
  SHODAN_API_KEY: z.string().optional(),
  CENSYS_API_KEY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  GITLAB_TOKEN: z.string().optional(),
  JIRA_API_TOKEN: z.string().optional(),
  SLACK_WEBHOOK_URL: z.string().optional(),
  DEFECTDOJO_API_KEY: z.string().optional(),
  SONARQUBE_TOKEN: z.string().optional(),
  NESSUS_ACCESS_KEY: z.string().optional(),
  NESSUS_SECRET_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
