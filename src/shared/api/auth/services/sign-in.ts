import { z } from 'zod';
import { instance } from '../../instance';
import { SigninBody, SigninResponse } from '../schemas/sign-in-schema';

export function signin(data: z.infer<typeof SigninBody>): Promise<z.infer<typeof SigninResponse>> {
  return instance(
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
