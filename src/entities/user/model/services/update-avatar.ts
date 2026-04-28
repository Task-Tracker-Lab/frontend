import { api } from 'shared/api';
import { AvatarUpdateResponse } from '../schema/avatar-update-schema';
import { z } from 'zod';

export const updateAvatar = (file: File) => {
  const formData = new FormData();

  formData.append('file', file);

  return api<z.infer<typeof AvatarUpdateResponse>>({
    url: '/users/me/avatar',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    contracts: {
      response: AvatarUpdateResponse,
    },
  });
};
