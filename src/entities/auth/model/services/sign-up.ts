import { z } from 'zod';
import { SignupBody, SignupResponse } from '../schemas/sign-up-schema';
import { api } from 'shared/api';

export function signup(data: z.infer<typeof SignupBody>): Promise<z.infer<typeof SignupResponse>> {
  return api(
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
