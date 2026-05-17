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

  static syncTags(slug: string, data: TTeam.SyncTagsBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/tags`,
      method: 'PUT',
      data,
      contracts: {
        body: STeam.SyncTagsBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static getProjects(slug: string, signal?: AbortSignal) {
    return api<TTeam.ProjectListResponse>({
      url: `/teams/${slug}/projects`,
      method: 'GET',
      contracts: {
        response: STeam.ProjectListResponse,
      },
      signal,
    });
  }

  static getProject(slug: string, id: string, token?: string, signal?: AbortSignal) {
    return api<TTeam.ProjectDetailResponse>({
      url: `/teams/${slug}/projects/${id}`,
      method: 'GET',
      params: token ? { token } : undefined,
      contracts: {
        response: STeam.ProjectDetailResponse,
      },
      signal,
    });
  }

  static createProject(slug: string, data: TTeam.CreateProjectBody) {
    return api<TTeam.CreateProjectResponse>({
      url: `/teams/${slug}/projects`,
      method: 'POST',
      data,
      contracts: {
        body: STeam.CreateProjectBody,
        response: STeam.CreateProjectResponse,
      },
    });
  }

  static updateProject(slug: string, id: string, data: TTeam.UpdateProjectBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/projects/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: STeam.UpdateProjectBody,
        response: STeam.ActionResponse,
      },
    });
  }

  static removeProject(slug: string, id: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/projects/${id}`,
      method: 'DELETE',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static archiveProject(slug: string, id: string) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/projects/${id}/archive`,
      method: 'POST',
      contracts: {
        response: STeam.ActionResponse,
      },
    });
  }

  static createProjectShareToken(slug: string, id: string, data: TTeam.CreateShareTokenBody) {
    return api<TTeam.ActionResponse>({
      url: `/teams/${slug}/projects/${id}/share`,
      method: 'POST',
      data,
      contracts: {
        body: STeam.CreateShareTokenBody,
        response: STeam.ActionResponse,
      },
    });
  }
}
