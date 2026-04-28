import { z } from 'zod';
import { api } from 'shared/api';
import { ResetPasswordBody, ResetPasswordResponse } from '../schemas/reset-password-schema';

export function resetPassword(
  data: z.infer<typeof ResetPasswordBody>
): Promise<z.infer<typeof ResetPasswordResponse>> {
  return api(
    {
      url: '/auth/password/reset',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: ResetPasswordBody,
        response: ResetPasswordResponse,
      },
    }
  );
}
