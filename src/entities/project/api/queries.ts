import { queryOptions } from '@tanstack/react-query';
import { projectFabricKeys } from '../model/const';
import { ProjectHttp } from './http';

export class ProjectQueries {
  static getProjects(teamId: string) {
    return queryOptions({
      queryKey: projectFabricKeys.list(teamId),
      queryFn: async ({ signal }) => ProjectHttp.getProjects(teamId, signal),
      staleTime: 60_000,
    });
  }

  static getProject(teamId: string, slug: string, token?: string) {
    return queryOptions({
      queryKey: [...projectFabricKeys.detail(teamId, slug), token ?? null],
      queryFn: async ({ signal }) => ProjectHttp.getProject(teamId, slug, token, signal),
      staleTime: 60_000,
    });
  }
}
