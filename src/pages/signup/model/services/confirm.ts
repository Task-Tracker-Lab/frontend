import { api } from 'shared/api';
import { ConfirmBody, ConfirmResponse } from '../schemas/ConfirmSchema';
import { z } from 'zod';

export function confirm(
  data: z.infer<typeof ConfirmBody>
): Promise<z.infer<typeof ConfirmResponse>> {
  return api(
    {
      url: '/auth/sign-up/confirm',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: ConfirmBody,
        response: ConfirmResponse,
      },
    }
  );
}
