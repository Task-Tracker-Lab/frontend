import { queryOptions } from '@tanstack/react-query';
import { userFabricKeys } from '../model/const';
import { UserHttp } from './http';

export class UserQueries {
  static getMe() {
    return queryOptions({
      queryKey: userFabricKeys.me(),
      queryFn: async ({ signal }) => UserHttp.getUser(signal),
      staleTime: 60_000,
    });
  }

  static getMeActivity() {
    return queryOptions({
      queryKey: userFabricKeys.meActivity(),
      queryFn: async ({ signal }) => UserHttp.getUserActivity(signal),
      staleTime: 60_000,
    });
  }

  static getMyTeams() {
    return queryOptions({
      queryKey: userFabricKeys.myTeams(),
      queryFn: async ({ signal }) => UserHttp.getMyTeams(signal),
      staleTime: 60_000,
    });
  }

  static getMyInvitations() {
    return queryOptions({
      queryKey: userFabricKeys.myInvitations(),
      queryFn: async ({ signal }) => UserHttp.getMyInvitations(signal),
      staleTime: 60_000,
    });
  }
}
