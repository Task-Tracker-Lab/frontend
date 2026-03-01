import { z } from 'zod';
import type { JwtExpires } from './modules/auth/types/jwt-expires.type';

enum NodeEnv {
  DEV = 'dev',
  PRODUCTION = 'production',
  TEST = 'test',
}

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.custom<JwtExpires>(),
  NODE_ENV: z.enum(NodeEnv),
});

export const env = envSchema.parse(process.env);
export const isDev = env.NODE_ENV === NodeEnv.DEV;
export const isProd = env.NODE_ENV === NodeEnv.PRODUCTION;
