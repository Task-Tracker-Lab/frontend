import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

export const OtpForm = z.object({
  code: SAuth.OTPCode,
});

export const otpFormBody = z.object({
  email: SAuth.Email,
  code: SAuth.OTPCode,
});
