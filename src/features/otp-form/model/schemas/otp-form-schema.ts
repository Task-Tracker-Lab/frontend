import { z } from 'zod';
import { OTPCodeSchema } from 'entities/auth';

export const OtpFormSchema = z.object({
  code: OTPCodeSchema,
});
