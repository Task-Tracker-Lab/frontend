import { api } from 'shared/api';
import { UserResponseSchema, type UserResponseSchemaType } from '../schemas/user-response';

export const getUser = (signal?: AbortSignal) =>
  api<UserResponseSchemaType>(
    {
      url: '/users/me',
      method: 'GET',
      contracts: {
        response: UserResponseSchema,
      },
    },
    {
      signal,
    }
  );
