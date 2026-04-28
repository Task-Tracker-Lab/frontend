import { api } from 'shared/api';
import { UserResponse } from '../schema/user-response-schema';
import { z } from 'zod/v4';

export const getUser = (signal?: AbortSignal) =>
  api<z.infer<typeof UserResponse>>({
    url: '/users/me',
    method: 'GET',
    contracts: {
      response: UserResponse,
    },
    signal,
  });
