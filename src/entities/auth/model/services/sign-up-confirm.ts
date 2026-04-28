import { z } from 'zod';
import { SignupConfirmBody, SignupConfirmResponse } from '../schemas/sign-up-confirm-schema';
import { api } from 'shared/api';

export function signupConfirm(data: z.infer<typeof SignupConfirmBody>) {
  return api<z.infer<typeof SignupConfirmResponse>>({
    url: '/auth/sign-up/confirm',
    method: 'POST',
    data: data,
    skipAuthRefresh: true,
    contracts: {
      body: SignupConfirmBody,
      response: SignupConfirmResponse,
    },
  });
}
