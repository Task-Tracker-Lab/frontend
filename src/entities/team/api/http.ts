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

  static checkSlug(slug: string, signal?: AbortSignal) {
    return api<TTeam.CheckSlugResponse>({
      url: `/teams/check-slug/${slug}`,
      method: 'GET',
      contracts: {
        response: STeam.CheckSlugResponse,
      },
      signal,
    });
  }

  static getTeam(slug: string, signal?: AbortSignal) {
    return api<TTeam.TeamDetailsResponse>({
      url: `/teams/${slug}`,
      method: 'GET',
      contracts: {
        response: STeam.TeamDetailsResponse,
      },
      signal,
    });
  }

  static updateTeam(slug: string, data: TTeam.UpdateTeamBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateTeamBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeTeam(slug: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static getInvitations(slug: string, signal?: AbortSignal) {
    return api<TTeam.TeamInvitationResponse[]>({
      url: `/teams/${slug}/invitations`,
      method: 'GET',
      contracts: {
        response: STeam.TeamInvitationResponse.array(),
      },
      signal,
    });
  }

  static getInvitation(slug: string, code: string, signal?: AbortSignal) {
    return api<TTeam.TeamInvitationResponse>({
      url: `/teams/${slug}/invitations/${code}`,
      method: 'GET',
      contracts: {
        response: STeam.TeamInvitationResponse,
      },
      signal,
    });
  }

  static inviteMember(slug: string, data: TTeam.InviteMemberBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/invitations`,
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
      url: `/teams/invitations/${code}/accept`,
      method: 'POST',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static updateInvitation(slug: string, code: string, data: TTeam.UpdateInvitationBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/invitations/${code}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateInvitationBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeInvitation(slug: string, code: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/invitations/${code}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static getMembers(slug: string, signal?: AbortSignal) {
    return api<TTeam.TeamMemberResponse[]>({
      url: `/teams/${slug}/members`,
      method: 'GET',
      contracts: {
        response: STeam.TeamMemberResponse.array(),
      },
      signal,
    });
  }

  static updateMember(slug: string, userId: string, data: TTeam.UpdateMemberBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/members/${userId}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateMemberBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeMember(slug: string, userId: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/members/${userId}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }
}
