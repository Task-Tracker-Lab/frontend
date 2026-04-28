import { z } from 'zod';
import { SignoutResponse } from '../schemas/sign-out-schema';
import { api } from 'shared/api';

export function signout(): Promise<z.infer<typeof SignoutResponse>> {
  return api(
    {
      url: '/auth/sign-out',
      method: 'POST',
    },
    {
      contracts: {
        response: SignoutResponse,
      },
    }
  );
}
