import { z } from 'zod';
import { api } from 'shared/api';
import {
  ResetPasswordConfirmBody,
  ResetPasswordConfirmResponse,
} from '../schemas/reset-password-confirm-schema';

export function resetPasswordConfirm(
  data: z.infer<typeof ResetPasswordConfirmBody>
): Promise<z.infer<typeof ResetPasswordConfirmResponse>> {
  return api(
    {
      url: '/auth/password/reset/confirm',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: ResetPasswordConfirmBody,
        response: ResetPasswordConfirmResponse,
      },
    }
  );
}
