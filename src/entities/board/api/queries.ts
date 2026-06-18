import { queryOptions } from '@tanstack/react-query';
import { boardFabricKeys } from '../model/conts';
import { BoardHttp } from './http';

export class BoardQueries {
  static getBoardList(projectId: string) {
    return queryOptions({
      queryKey: boardFabricKeys.list(projectId),
      queryFn: async ({ signal }) => BoardHttp.getBoardList(projectId, signal),
      staleTime: 60_000,
    });
  }

  static getBoard(projectId: string, id: string) {
    return queryOptions({
      queryKey: boardFabricKeys.detail(projectId, id),
      queryFn: async ({ signal }) => BoardHttp.getBoard(projectId, id, signal),
      staleTime: 60_000,
    });
  }

  static getBoardColumnList(boardId: string) {
    return queryOptions({
      queryKey: boardFabricKeys.columns(boardId),
      queryFn: async ({ signal }) => BoardHttp.getBoardColumnList(boardId, signal),
      staleTime: 60_000,
    });
  }

  static getBoardColumn(boardId: string, id: string) {
    return queryOptions({
      queryKey: boardFabricKeys.column(boardId, id),
      queryFn: async ({ signal }) => BoardHttp.getBoardColumn(boardId, id, signal),
      staleTime: 60_000,
    });
  }
}
