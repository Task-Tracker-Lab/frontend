import { api } from 'shared/api';
import * as SProject from '../model/schemas';
import * as TProject from '../model/types';

export class ProjectHttp {
  static getProjects(teamId: string, signal?: AbortSignal) {
    return api<TProject.ProjectListResponse>({
      url: `/teams/${teamId}/projects`,
      method: 'GET',
      contracts: {
        response: SProject.ProjectListResponse,
      },
      signal,
    });
  }

  static getProject(teamId: string, id: string, token?: string, signal?: AbortSignal) {
    return api<TProject.ProjectDetailResponse>({
      url: `/teams/${teamId}/projects/${id}`,
      method: 'GET',
      params: token ? { token } : undefined,
      contracts: {
        response: SProject.ProjectDetailResponse,
      },
      signal,
    });
  }

  static createProject(teamId: string, data: TProject.CreateProjectBody) {
    return api<TProject.CreateProjectResponse>({
      url: `/teams/${teamId}/projects`,
      method: 'POST',
      data,
      contracts: {
        body: SProject.CreateProjectBody,
        response: SProject.CreateProjectResponse,
      },
    });
  }

  static updateProject(teamId: string, id: string, data: TProject.UpdateProjectBody) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamId}/projects/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SProject.UpdateProjectBody,
        response: SProject.ActionResponse,
      },
    });
  }

  static removeProject(teamId: string, id: string) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamId}/projects/${id}`,
      method: 'DELETE',
      contracts: {
        response: SProject.ActionResponse,
      },
    });
  }

  static archiveProject(teamId: string, id: string) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamId}/projects/${id}/archive`,
      method: 'POST',
      contracts: {
        response: SProject.ActionResponse,
      },
    });
  }

  static createShareToken(teamId: string, id: string, data: TProject.CreateShareTokenBody = {}) {
    return api<TProject.CreateShareTokenResponse>({
      url: `/teams/${teamId}/projects/${id}/share`,
      method: 'POST',
      data,
      contracts: {
        body: SProject.CreateShareTokenBody,
        response: SProject.CreateShareTokenResponse,
      },
    });
  }
}
