import { z } from 'zod';
import { EmailSchema } from './fields/email-schema';
import { PasswordSchema } from './fields/password-schema';

export const SigninBody = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SigninResponse = z.object({
  success: z.boolean(),
  token: z.string(),
  message: z.string().optional(),
});
