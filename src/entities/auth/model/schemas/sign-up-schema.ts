import { z } from 'zod';
import { PasswordSchema } from './fields/password-schema';
import { EmailSchema } from './fields/email-schema';

export const SignupBody = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(50).trim(),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа').max(50).trim(),
  middleName: z.string().max(50).trim().optional().or(z.literal('')),
});

export const SignupResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
