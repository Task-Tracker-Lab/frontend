import { api } from 'shared/api';
import * as SBoard from '../model/schemas';
import * as TBoard from '../model/types';

export class BoardHttp {
  static getBoardList(projectSlug: string, signal?: AbortSignal) {
    return api<TBoard.BoardListResponse>({
      url: `/projects/${projectSlug}/area`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardListResponse,
      },
      signal,
    });
  }

  static getBoard(projectSlug: string, id: string, signal?: AbortSignal) {
    return api<TBoard.BoardResponse>({
      url: `/projects/${projectSlug}/area/${id}`,
      method: 'GET',
      contracts: {
        response: SBoard.Board,
      },
      signal,
    });
  }

  static createBoard(projectSlug: string, data: TBoard.CreateBoardBody) {
    return api<TBoard.CreateBoardResponse>({
      url: `/projects/${projectSlug}/area`,
      method: 'POST',
      data,
      contracts: {
        body: SBoard.CreateBoardBody,
        response: SBoard.CreateBoardResponse,
      },
    });
  }

  static updateBoard(projectSlug: string, boardSlug: string, data: TBoard.UpdateBoardBody) {
    return api<TBoard.ActionResponse>({
      url: `/projects/${projectSlug}/area/${boardSlug}`,
      method: 'PUT',
      data,
      contracts: {
        body: SBoard.UpdateBoardBody,
        response: SBoard.ActionResponse,
      },
    });
  }

  static removeBoard(projectSlug: string, boardSlug: string) {
    return api<TBoard.ActionResponse>({
      url: `/projects/${projectSlug}/boards/${boardSlug}`,
      method: 'DELETE',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }

  static getBoardColumnList(boardSlug: string, signal?: AbortSignal) {
    return api<TBoard.BoardColumnListResponse>({
      url: `/area/${boardSlug}/columns`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardColumnListResponse,
      },
      signal,
    });
  }

  static getBoardColumn(boardSlug: string, columnId: string, signal?: AbortSignal) {
    return api<TBoard.BoardColumnResponse>({
      url: `/area/${boardSlug}/columns/${columnId}`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardColumn,
      },
      signal,
    });
  }

  static createBoardColumn(boardSlug: string, data: TBoard.CreateBoardColumnBody) {
    return api<TBoard.CreateBoardColumnResponse>({
      url: `/area/${boardSlug}/columns`,
      method: 'POST',
      data,
      contracts: {
        body: SBoard.CreateBoardColumnBody,
        response: SBoard.CreateBoardColumnResponse,
      },
    });
  }

  static updateBoardColumn(
    boardSlug: string,
    columnId: string,
    data: TBoard.UpdateBoardColumnBody
  ) {
    return api<TBoard.ActionResponse>({
      url: `/area/${boardSlug}/columns/${columnId}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SBoard.UpdateBoardColumnBody,
        response: SBoard.ActionResponse,
      },
    });
  }

  static removeBoardColumn(boardSlug: string, columnId: string) {
    return api<TBoard.ActionResponse>({
      url: `/area/${boardSlug}/columns/${columnId}`,
      method: 'DELETE',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }
  static restoreBoardColumn(boardSlug: string, columnId: string) {
    return api<TBoard.ActionResponse>({
      url: `/area/${boardSlug}/columns/${columnId}/restore`,
      method: 'POST',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }
}
