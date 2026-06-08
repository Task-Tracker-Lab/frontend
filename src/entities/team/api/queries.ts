import { queryOptions } from '@tanstack/react-query';
import { teamFabricKeys } from '../model/const';
import { TeamHttp } from './http';

export class TeamQueries {
  static getTeam(teamId: string) {
    return queryOptions({
      queryKey: teamFabricKeys.byId(teamId),
      queryFn: async ({ signal }) => TeamHttp.getTeam(teamId, signal),
      staleTime: 60_000,
    });
  }

  static getInvitation(teamId: string, code: string) {
    return queryOptions({
      queryKey: teamFabricKeys.invitation(teamId, code),
      queryFn: async ({ signal }) => TeamHttp.getInvitation(teamId, code, signal),
      staleTime: 60_000,
    });
  }

  static getInvitations(teamId: string) {
    return queryOptions({
      queryKey: teamFabricKeys.invitations(teamId),
      queryFn: async ({ signal }) => TeamHttp.getInvitations(teamId, signal),
      staleTime: 60_000,
    });
  }

  static getMembers(teamId: string) {
    return queryOptions({
      queryKey: teamFabricKeys.members(teamId),
      queryFn: async ({ signal }) => TeamHttp.getMembers(teamId, signal),
      staleTime: 60_000,
    });
  }
}
