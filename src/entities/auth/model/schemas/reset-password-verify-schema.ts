import { z } from 'zod';
import { EmailSchema } from './fields/email-schema';
import { OTPCodeSchema } from './fields/otp-code';

export const ResetPasswordVerifyBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});

export const ResetPasswordVerifyResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
