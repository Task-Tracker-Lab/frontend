import { z } from 'zod'
import { JwtExpires } from './modules/auth/types/jwt-expires.type'

const envSchema = z.object({
    PORT: z.string(),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.custom<JwtExpires>(),
    NODE_ENV: z.enum(['dev', 'production'])
})

export const env = envSchema.parse(process.env)
export const isDev = env.NODE_ENV === 'dev'
