import { z } from 'zod/v4';
import { api } from 'shared/api';
import { ResetPasswordBody, ResetPasswordResponse } from '../schemas/reset-password-schema';

export function resetPassword(data: z.infer<typeof ResetPasswordBody>) {
  return api<z.infer<typeof ResetPasswordResponse>>({
    url: '/auth/password/reset',
    method: 'POST',
    data: data,
    contracts: {
      body: ResetPasswordBody,
      response: ResetPasswordResponse,
    },
  });
}
