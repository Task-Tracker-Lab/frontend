import { z } from 'zod/v4';
import * as SBoard from './schemas';

export type BoardColumnResponse = z.infer<typeof SBoard.BoardColumn>;

export type BoardResponse = z.infer<typeof SBoard.Board>;
export type BoardListResponse = z.infer<typeof SBoard.BoardListResponse>;

export type CreateBoardResponse = z.infer<typeof SBoard.CreateBoardResponse>;
export type CreateBoardBody = z.infer<typeof SBoard.CreateBoardBody>;
