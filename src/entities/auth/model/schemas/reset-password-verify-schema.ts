import { z } from 'zod/v4';
import { EmailSchema } from './fields/email-schema';
import { OTPCodeSchema } from './fields/otp-code';
import { GlobalSuccessSchema } from 'shared/api';

export const ResetPasswordVerifyBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});

export const ResetPasswordVerifyResponse = GlobalSuccessSchema;
