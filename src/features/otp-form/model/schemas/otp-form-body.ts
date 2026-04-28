import { z } from 'zod';
import { EmailSchema, OTPCodeSchema } from 'entities/auth';

export const otpFormBody = z.object({
  email: EmailSchema,
  code: OTPCodeSchema,
});
