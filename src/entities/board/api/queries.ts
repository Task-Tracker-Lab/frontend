import { queryOptions } from '@tanstack/react-query';
import { boardFabricKeys } from '../model/conts';
import { BoardHttp } from './http';

export class BoardQueries {
  //   static getTeam(slug: string) {
  //     return queryOptions({
  //       queryKey: boardFabricKeys.byId(slug),
  //       queryFn: async ({ signal }) => BoardHttp.getTeam(slug, signal),
  //       staleTime: 60_000,
  //     });
  //   }
  static getBoardList(projectId: string) {
    return queryOptions({
      queryKey: boardFabricKeys.list(projectId),
      queryFn: async ({ signal }) => BoardHttp.getBoardList(projectId, signal),
      staleTime: 60_000,
    });
  }
}
