import { queryOptions } from '@tanstack/react-query';
import { projectFabricKeys } from '../model/const';
import { ProjectHttp } from './http';

export class ProjectQueries {
  static getProjects(teamSlug: string) {
    return queryOptions({
      queryKey: projectFabricKeys.list(teamSlug),
      queryFn: async ({ signal }) => ProjectHttp.getProjects(teamSlug, signal),
      staleTime: 60_000,
    });
  }

  static getProject(teamSlug: string, id: string, token?: string) {
    return queryOptions({
      queryKey: [...projectFabricKeys.detail(teamSlug, id), token ?? null],
      queryFn: async ({ signal }) => ProjectHttp.getProject(teamSlug, id, token, signal),
      staleTime: 60_000,
    });
  }
}
