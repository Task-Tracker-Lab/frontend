import { z } from 'zod';
import { SigninBody, SigninResponse } from '../schemas/sign-in-schema';
import { api } from 'shared/api';

export function signin(data: z.infer<typeof SigninBody>) {
  return api<z.infer<typeof SigninResponse>>({
    url: '/auth/sign-in',
    method: 'POST',
    data: data,
    skipAuthRefresh: true,
    contracts: {
      body: SigninBody,
      response: SigninResponse,
    },
  });
}
