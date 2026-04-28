import { api } from 'shared/api';

//todo ручка в разработке
export const getUserActivity = (signal?: AbortSignal) =>
  api<unknown>({
    url: '/users/me/activity',
    method: 'GET',
    contracts: {},
    signal,
  });
