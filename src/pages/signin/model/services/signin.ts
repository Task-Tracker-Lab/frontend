import { api } from 'shared/api';
import { SigninBody, SigninResponse } from '../schemas/login-schema';
import { z } from 'zod';

export function signin(data: z.infer<typeof SigninBody>): Promise<z.infer<typeof SigninResponse>> {
  return api(
    {
      url: '/auth/sign-in',
      method: 'POST',
      data: data,
      skipAuthRefresh: true,
    },
    {
      contracts: {
        body: SigninBody,
        response: SigninResponse,
      },
    }
  );
}
