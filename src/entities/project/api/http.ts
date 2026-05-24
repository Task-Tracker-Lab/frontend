import { api } from 'shared/api';
import * as SProject from '../model/schemas';
import * as TProject from '../model/types';

export class ProjectHttp {
  static getProjects(teamSlug: string, signal?: AbortSignal) {
    return api<TProject.ProjectListResponse>({
      url: `/teams/${teamSlug}/projects`,
      method: 'GET',
      contracts: {
        response: SProject.ProjectListResponse,
      },
      signal,
    });
  }

  static getProject(teamSlug: string, id: string, token?: string, signal?: AbortSignal) {
    return api<TProject.ProjectDetailResponse>({
      url: `/teams/${teamSlug}/projects/${id}`,
      method: 'GET',
      params: token ? { token } : undefined,
      contracts: {
        response: SProject.ProjectDetailResponse,
      },
      signal,
    });
  }

  static createProject(teamSlug: string, data: TProject.CreateProjectBody) {
    return api<TProject.CreateProjectResponse>({
      url: `/teams/${teamSlug}/projects`,
      method: 'POST',
      data,
      contracts: {
        body: SProject.CreateProjectBody,
        response: SProject.CreateProjectResponse,
      },
    });
  }

  static updateProject(teamSlug: string, id: string, data: TProject.UpdateProjectBody) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamSlug}/projects/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SProject.UpdateProjectBody,
        response: SProject.ActionResponse,
      },
    });
  }

  static removeProject(teamSlug: string, id: string) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamSlug}/projects/${id}`,
      method: 'DELETE',
      contracts: {
        response: SProject.ActionResponse,
      },
    });
  }

  static archiveProject(teamSlug: string, id: string) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamSlug}/projects/${id}/archive`,
      method: 'POST',
      contracts: {
        response: SProject.ActionResponse,
      },
    });
  }

  static createShareToken(teamSlug: string, id: string, data: TProject.CreateShareTokenBody) {
    return api<TProject.ActionResponse>({
      url: `/teams/${teamSlug}/projects/${id}/share`,
      method: 'POST',
      data,
      contracts: {
        body: SProject.CreateShareTokenBody,
        response: SProject.ActionResponse,
      },
    });
  }
}
