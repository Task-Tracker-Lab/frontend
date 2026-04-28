import { z } from 'zod/v4';
import { OTPCodeSchema } from './fields/otp-code';
import { EmailSchema } from './fields/email-schema';
import { GlobalSuccessSchema } from 'shared/api';

export const SignupConfirmBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});

export const SignupConfirmResponse = GlobalSuccessSchema.extend({
  token: z.string(),
});
