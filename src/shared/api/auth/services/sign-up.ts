import { z } from 'zod';
import { instance } from '../../instance';
import { SignupBody, SignupResponse } from '../schemas/sign-up-schema';

export function signup(data: z.infer<typeof SignupBody>): Promise<z.infer<typeof SignupResponse>> {
  return instance(
    {
      url: '/auth/sign-up',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: SignupBody,
        response: SignupResponse,
      },
    }
  );
}
