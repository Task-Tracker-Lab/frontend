import { z } from 'zod';
import { instance } from '../../instance';
import { SignoutResponse } from '../schemas/sign-out-schema';

export function signout(): Promise<z.infer<typeof SignoutResponse>> {
  return instance(
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
