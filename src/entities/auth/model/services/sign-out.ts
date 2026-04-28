import { z } from 'zod/v4';
import { SignoutResponse } from '../schemas/sign-out-schema';
import { api } from 'shared/api';

export function signout() {
  return api<z.infer<typeof SignoutResponse>>({
    url: '/auth/sign-out',
    method: 'POST',
    contracts: {
      response: SignoutResponse,
    },
  });
}
