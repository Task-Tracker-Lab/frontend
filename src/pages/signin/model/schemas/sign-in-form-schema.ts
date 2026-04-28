import { z } from 'zod/v4';
import { EmailSchema, PasswordSchema } from 'entities/auth';

export const SigninFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
