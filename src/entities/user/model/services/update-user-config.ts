import { api } from 'shared/api';
import { ProfileUpdateBody, ProfileUpdateResponse } from '../schema/profile-update-schema';
import { z } from 'zod';

type Body = z.infer<typeof ProfileUpdateBody>;

export const updateUserConfig = (data: Body) =>
  api<Body>({
    url: '/users/me',
    method: 'PATCH',
    data,
    contracts: {
      body: ProfileUpdateBody,
      response: ProfileUpdateResponse,
    },
  });
