import { z } from 'zod';
import { EmailSchema } from './fields/email-schema';
import { GlobalSuccessSchema } from 'shared/api';

export const ResetPasswordBody = z.object({
  email: EmailSchema,
});

export const ResetPasswordResponse = GlobalSuccessSchema;
