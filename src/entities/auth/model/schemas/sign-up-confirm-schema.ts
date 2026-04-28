import { z } from 'zod/v4';
import { OTPCodeSchema } from './fields/otp-code';
import { EmailSchema } from './fields/email-schema';

export const SignupConfirmBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});

export const SignupConfirmResponse = z.object({
  success: z.boolean(),
  token: z.string(),
  message: z.string().optional(),
});
