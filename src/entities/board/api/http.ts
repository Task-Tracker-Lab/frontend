import { api } from 'shared/api';
import * as SBoard from '../model/schemas';
import * as TBoard from '../model/types';

export class BoardHttp {
  static getBoardList(projectId: string, signal?: AbortSignal) {
    return api<TBoard.BoardListResponse>({
      url: `/projects/${projectId}/boards`,
      method: 'GET',
      contracts: {
        // response: SBoard.BoardListResponse, // TODO
      },
      signal,
    });
  }
  static createBoard(projectId: string, data: TBoard.CreateBoardBody) {
    return api<TBoard.CreateBoardResponse>({
      url: `/projects/${projectId}/boards`,
      method: 'POST',
      contracts: {
        response: SBoard.CreateBoardResponse,
        body: SBoard.CreateBoardBody,
      },
      data,
    });
  }
}
