import { z } from 'zod/v4';
import { EmailSchema } from './fields/email-schema';
import { PasswordSchema } from './fields/password-schema';
import { GlobalSuccessSchema } from 'shared/api';

export const SigninBody = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SigninResponse = GlobalSuccessSchema.extend({
  token: z.string(),
});
