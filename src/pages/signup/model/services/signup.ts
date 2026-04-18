import { api } from 'shared/api';
import { SignUpBody, SignUpResponse } from '../schemas/SignupSchema';
import { z } from 'zod';

export function signup(data: z.infer<typeof SignUpBody>): Promise<z.infer<typeof SignUpResponse>> {
  return api(
    {
      url: '/auth/sign-up',
      method: 'POST',
      data: data,
    },
    {
      contracts: {
        body: SignUpBody,
        response: SignUpResponse,
      },
    }
  );
}
