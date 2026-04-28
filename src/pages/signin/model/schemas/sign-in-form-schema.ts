import { z } from 'zod';
import { EmailSchema, PasswordSchema } from 'entities/auth';

export const SigninFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
