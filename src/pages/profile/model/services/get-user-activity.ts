import { api } from 'shared/api';

//todo в разработке
export const getUserActivity = (signal?: AbortSignal) =>
  api<unknown>(
    {
      url: '/users/me/activity',
      method: 'GET',
      contracts: {},
    },
    {
      signal,
    }
  );
