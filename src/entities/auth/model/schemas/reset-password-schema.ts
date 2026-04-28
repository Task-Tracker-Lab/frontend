import { z } from 'zod/v4';
import { EmailSchema } from './fields/email-schema';
import { GlobalSuccessSchema } from 'shared/api';

export const ResetPasswordBody = z.object({
  email: EmailSchema,
});

export const ResetPasswordResponse = GlobalSuccessSchema;
