import { api } from 'shared/api';
import { SignupBody, SignupResponse } from '../schemas/signup-schema';
import { z } from 'zod';

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
