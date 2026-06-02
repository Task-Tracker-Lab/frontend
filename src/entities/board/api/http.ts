import { api } from 'shared/api';
import * as SBoard from '../model/schemas';
import * as TBoard from '../model/types';

export class BoardHttp {
  static getBoardList(projectId: string, signal?: AbortSignal) {
    return api<TBoard.BoardListResponse>({
      url: `/projects/${projectId}/boards`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardListResponse,
      },
      signal,
    });
  }

  static getBoard(projectId: string, id: string, signal?: AbortSignal) {
    return api<TBoard.BoardResponse>({
      url: `/projects/${projectId}/boards/${id}`,
      method: 'GET',
      contracts: {
        response: SBoard.Board,
      },
      signal,
    });
  }

  static createBoard(projectId: string, data: TBoard.CreateBoardBody) {
    return api<TBoard.CreateBoardResponse>({
      url: `/projects/${projectId}/boards`,
      method: 'POST',
      data,
      contracts: {
        body: SBoard.CreateBoardBody,
        response: SBoard.CreateBoardResponse,
      },
    });
  }

  static updateBoard(projectId: string, id: string, data: TBoard.UpdateBoardBody) {
    return api<TBoard.ActionResponse>({
      url: `/projects/${projectId}/boards/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SBoard.UpdateBoardBody,
        response: SBoard.ActionResponse,
      },
    });
  }

  static removeBoard(projectId: string, id: string) {
    return api<TBoard.ActionResponse>({
      url: `/projects/${projectId}/boards/${id}`,
      method: 'DELETE',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }

  static getBoardColumnList(boardId: string, signal?: AbortSignal) {
    return api<TBoard.BoardColumnListResponse>({
      url: `/boards/${boardId}/columns`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardColumnListResponse,
      },
      signal,
    });
  }

  static getBoardColumn(boardId: string, id: string, signal?: AbortSignal) {
    return api<TBoard.BoardColumnResponse>({
      url: `/boards/${boardId}/columns/${id}`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardColumn,
      },
      signal,
    });
  }

  static createBoardColumn(boardId: string, data: TBoard.CreateBoardColumnBody) {
    return api<TBoard.CreateBoardColumnResponse>({
      url: `/boards/${boardId}/columns`,
      method: 'POST',
      data,
      contracts: {
        body: SBoard.CreateBoardColumnBody,
        response: SBoard.CreateBoardColumnResponse,
      },
    });
  }

  static updateBoardColumn(boardId: string, id: string, data: TBoard.UpdateBoardColumnBody) {
    return api<TBoard.ActionResponse>({
      url: `/boards/${boardId}/columns/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SBoard.UpdateBoardColumnBody,
        response: SBoard.ActionResponse,
      },
    });
  }

  static removeBoardColumn(boardId: string, id: string) {
    return api<TBoard.ActionResponse>({
      url: `/boards/${boardId}/columns/${id}`,
      method: 'DELETE',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }

  static getBoardViewList(boardId: string, signal?: AbortSignal) {
    return api<TBoard.BoardViewListResponse>({
      url: `/boards/${boardId}/views`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardViewListResponse,
      },
      signal,
    });
  }

  static getBoardView(boardId: string, id: string, signal?: AbortSignal) {
    return api<TBoard.BoardViewResponse>({
      url: `/boards/${boardId}/views/${id}`,
      method: 'GET',
      contracts: {
        response: SBoard.BoardView,
      },
      signal,
    });
  }

  static createBoardView(boardId: string, data: TBoard.CreateBoardViewBody) {
    return api<TBoard.CreateBoardViewResponse>({
      url: `/boards/${boardId}/views`,
      method: 'POST',
      data,
      contracts: {
        body: SBoard.CreateBoardViewBody,
        response: SBoard.CreateBoardViewResponse,
      },
    });
  }

  static updateBoardView(boardId: string, id: string, data: TBoard.UpdateBoardViewBody) {
    return api<TBoard.ActionResponse>({
      url: `/boards/${boardId}/views/${id}`,
      method: 'PATCH',
      data,
      contracts: {
        body: SBoard.UpdateBoardViewBody,
        response: SBoard.ActionResponse,
      },
    });
  }

  static removeBoardView(boardId: string, id: string) {
    return api<TBoard.ActionResponse>({
      url: `/boards/${boardId}/views/${id}`,
      method: 'DELETE',
      contracts: {
        response: SBoard.ActionResponse,
      },
    });
  }
}
