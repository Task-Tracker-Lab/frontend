import { api } from 'shared/api';

export const postAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api({
    url: '/users/me/avatar',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
