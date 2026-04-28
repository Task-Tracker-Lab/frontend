import { z } from 'zod';
import { api } from 'shared/api';
import {
  ResetPasswordVerifyBody,
  ResetPasswordVerifyResponse,
} from '../schemas/reset-password-verify-schema';

export function resetPasswordVerify(
  data: z.infer<typeof ResetPasswordVerifyBody>
): Promise<z.infer<typeof ResetPasswordVerifyResponse>> {
  return api(
    {
      url: '/auth/password/reset/verify',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: ResetPasswordVerifyBody,
        response: ResetPasswordVerifyResponse,
      },
    }
  );
}
