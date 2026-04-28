import { z } from 'zod';
import { PasswordSchema } from './fields/password-schema';
import { EmailSchema } from './fields/email-schema';

export const ResetPasswordConfirmBody = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export const ResetPasswordConfirmResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
