import { z } from 'zod/v4';
import { PasswordSchema } from './fields/password-schema';
import { EmailSchema } from './fields/email-schema';
import { GlobalSuccessSchema } from 'shared/api';

export const ResetPasswordConfirmBody = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export const ResetPasswordConfirmResponse = GlobalSuccessSchema;
