import { api } from 'shared/api';
import * as STeam from '../model/schemas';
import * as TTeam from '../model/types';

export class TeamHttp {
  static createTeam(data: TTeam.CreateTeamBody) {
    return api<TTeam.ActionResponse>({
      url: '/teams',
      method: 'POST',
      data,
      contracts: {
        body: STeam.CreateTeamBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static getTeam(teamId: string, signal?: AbortSignal) {
    return api<TTeam.TeamDetailsResponse>({
      url: `/teams/${teamId}`,
      method: 'GET',
      contracts: {
        response: STeam.TeamDetailsResponse,
      },
      signal,
    });
  }

  static updateTeam(teamId: string, data: TTeam.UpdateTeamBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateTeamBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeTeam(teamId: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static getInvitations(teamId: string, signal?: AbortSignal) {
    return api<TTeam.TeamInvitationListResponse>({
      url: `/teams/${teamId}/invitations`,
      method: 'GET',
      contracts: {
        response: STeam.TeamInvitationListResponse,
      },
      signal,
    });
  }

  static getInvitation(teamId: string, code: string, signal?: AbortSignal) {
    return api<TTeam.TeamInvitationResponse>({
      url: `/teams/${teamId}/invitations/${code}`,
      method: 'GET',
      contracts: {
        response: STeam.TeamInvitationResponse,
      },
      signal,
    });
  }

  static inviteMember(teamId: string, data: TTeam.InviteMemberBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}/invitations`,
      method: 'POST',
      data,
      contracts: {
        body: STeam.InviteMemberBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static acceptInvitation(code: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams//invitations/${code}/accept`, // TODO: Убрать дублирующий слеш в URL, когда починят роутинг на бэке
      method: 'POST',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static updateInvitation(teamId: string, code: string, data: TTeam.UpdateInvitationBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}/invitations/${code}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateInvitationBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeInvitation(teamId: string, code: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}/invitations/${code}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static getMembers(teamId: string, signal?: AbortSignal) {
    return api<TTeam.TeamMemberListResponse>({
      url: `/teams/${teamId}/members`,
      method: 'GET',
      contracts: {
        response: STeam.TeamMemberListResponse,
      },
      signal,
    });
  }

  static updateMember(teamId: string, userId: string, data: TTeam.UpdateMemberBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}/members/${userId}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateMemberBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeMember(teamId: string, userId: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${teamId}/members/${userId}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }
}
