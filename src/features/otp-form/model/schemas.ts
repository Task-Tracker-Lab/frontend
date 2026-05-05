import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

export const OTPFormBody = z.object({
  email: SAuth.Email,
  code: SAuth.OTPCode,
});
