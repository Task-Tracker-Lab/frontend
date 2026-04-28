import { z } from 'zod/v4';
import { api } from 'shared/api';
import {
  ResetPasswordVerifyBody,
  ResetPasswordVerifyResponse,
} from '../schemas/reset-password-verify-schema';

export function resetPasswordVerify(data: z.infer<typeof ResetPasswordVerifyBody>) {
  return api<z.infer<typeof ResetPasswordVerifyResponse>>({
    url: '/auth/password/reset/verify',
    method: 'POST',
    data: data,
    contracts: {
      body: ResetPasswordVerifyBody,
      response: ResetPasswordVerifyResponse,
    },
  });
}
