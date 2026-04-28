import { z } from 'zod/v4';
import { EmailSchema, OTPCodeSchema } from 'entities/auth';

export const otpFormBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});
