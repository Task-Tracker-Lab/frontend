import { queryOptions } from '@tanstack/react-query';
import { teamFabricKeys } from '../model/const';
import { TeamHttp } from './http';

export class TeamQueries {
  static getTeam(slug: string) {
    return queryOptions({
      queryKey: teamFabricKeys.bySlug(slug),
      queryFn: async ({ signal }) => TeamHttp.getTeam(slug, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static checkSlug(slug: string) {
    return queryOptions({
      queryKey: teamFabricKeys.checkSlug(slug),
      queryFn: async ({ signal }) => TeamHttp.checkSlug(slug, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getInvitation(slug: string, code: string) {
    return queryOptions({
      queryKey: teamFabricKeys.invitation(slug, code),
      queryFn: async ({ signal }) => TeamHttp.getInvitation(slug, code, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getInvitations(slug: string) {
    return queryOptions({
      queryKey: teamFabricKeys.invitations(slug),
      queryFn: async ({ signal }) => TeamHttp.getInvitations(slug, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getMembers(slug: string) {
    return queryOptions({
      queryKey: teamFabricKeys.members(slug),
      queryFn: async ({ signal }) => TeamHttp.getMembers(slug, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getProjects(slug: string) {
    return queryOptions({
      queryKey: teamFabricKeys.projects(slug),
      queryFn: async ({ signal }) => TeamHttp.getProjects(slug, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }

  static getProject(slug: string, id: string, token?: string) {
    return queryOptions({
      queryKey: [...teamFabricKeys.project(slug, id), token ?? null],
      queryFn: async ({ signal }) => TeamHttp.getProject(slug, id, token, signal),
      staleTime: 60_000,
      refetchOnMount: false,
    });
  }
}
