import { api } from 'shared/api';
import { ProfileUpdateSchema, type ProfileUpdateSchemaType } from '../schemas/profile-update';

export const patchUser = (data: ProfileUpdateSchemaType) =>
  api<ProfileUpdateSchemaType>({
    url: '/users/me',
    method: 'PATCH',
    data,
    contracts: {
      body: ProfileUpdateSchema,
    },
  });
