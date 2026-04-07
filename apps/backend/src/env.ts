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
  CORS_ALLOWED_ORIGINS: z
    .string()
    .min(1, "CORS_ALLOWED_ORIGINS can't be empty")
    .transform((val) => val.split(','))
    .pipe(
      z.array(
        z.url({ error: 'Origin must be valid URL' }).refine((val) => {
          const url = new URL(val);
          return url.origin === val;
        }, 'Invalid CORS origin')
      )
    ),
});

export const env = envSchema.parse(process.env);
export const isDev = env.NODE_ENV === NodeEnv.DEV;
export const isProd = env.NODE_ENV === NodeEnv.PRODUCTION;
