import { queryOptions } from '@tanstack/react-query';
import { boardFabricKeys } from '../model/consts';
import { BoardHttp } from './http';

export class BoardQueries {
  static getBoardList(slug: string) {
    return queryOptions({
      queryKey: boardFabricKeys.list(slug),
      queryFn: async ({ signal }) => BoardHttp.getBoardList(slug, signal),
      staleTime: 60_000,
    });
  }

  static getBoard(slug: string, id: string) {
    return queryOptions({
      queryKey: boardFabricKeys.detail(slug, id),
      queryFn: async ({ signal }) => BoardHttp.getBoard(slug, id, signal),
      staleTime: 60_000,
    });
  }

  static getBoardColumnList(slug: string) {
    return queryOptions({
      queryKey: boardFabricKeys.columns(slug),
      queryFn: async ({ signal }) => BoardHttp.getBoardColumnList(slug, signal),
      staleTime: 60_000,
    });
  }

  static getBoardColumn(slug: string, id: string) {
    return queryOptions({
      queryKey: boardFabricKeys.column(slug, id),
      queryFn: async ({ signal }) => BoardHttp.getBoardColumn(slug, id, signal),
      staleTime: 60_000,
    });
  }
}
