import { userFabricKeys } from '../model/const';
import { queryOptions } from '@tanstack/react-query';
import { UserHttp } from './http';

export class UserQueries {
  static getMe() {
    return queryOptions({
      queryKey: userFabricKeys.me(),
      queryFn: async ({ signal }) => UserHttp.getUser(signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getMeActivity() {
    return queryOptions({
      queryKey: userFabricKeys.meActivity(),
      queryFn: async ({ signal }) => UserHttp.getUserActivity(signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }
}
