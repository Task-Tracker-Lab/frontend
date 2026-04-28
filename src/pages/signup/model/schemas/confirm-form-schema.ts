import { z } from 'zod';
import { OTPCodeSchema } from 'entities/auth';

export const ConfirmFormSchema = z.object({
  code: OTPCodeSchema,
});
