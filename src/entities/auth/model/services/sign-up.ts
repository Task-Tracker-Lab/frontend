import { z } from 'zod/v4';
import { SignupBody, SignupResponse } from '../schemas/sign-up-schema';
import { api } from 'shared/api';

export function signup(data: z.infer<typeof SignupBody>) {
  return api<z.infer<typeof SignupResponse>>({
    url: '/auth/sign-up',
    method: 'POST',
    data: data,
    contracts: {
      body: SignupBody,
      response: SignupResponse,
    },
  });
}
