import { z } from 'zod';
import { EmailSchema } from './fields/email-schema';

export const ResetPasswordBody = z.object({
  email: EmailSchema,
});

export const ResetPasswordResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
