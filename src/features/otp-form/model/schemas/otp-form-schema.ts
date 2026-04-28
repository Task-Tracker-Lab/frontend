import { z } from 'zod/v4';
import { OTPCodeSchema } from 'entities/auth';

export const OtpFormSchema = z.object({
  code: OTPCodeSchema,
});
