import { z } from 'zod/v4';
import * as SBoard from './schemas';

export type BoardColumnStatus = z.infer<typeof SBoard.ColumnStatusEnum>;
export type BoardViewType = z.infer<typeof SBoard.ViewTypeEnum>;
export type BoardColumnQueryParams = z.infer<typeof SBoard.BoardColumnQueryParams>;

export type BoardColumnResponse = z.infer<typeof SBoard.BoardColumn>;
export type BoardColumnListResponse = z.infer<typeof SBoard.BoardColumnListResponse>;

export type BoardResponse = z.infer<typeof SBoard.Board>;
export type BoardListResponse = z.infer<typeof SBoard.BoardListResponse>;

export type CreateBoardBody = z.infer<typeof SBoard.CreateBoardBody>;
export type UpdateBoardBody = z.infer<typeof SBoard.UpdateBoardBody>;
export type CreateBoardResponse = z.infer<typeof SBoard.CreateBoardResponse>;

export type CreateBoardColumnBody = z.infer<typeof SBoard.CreateBoardColumnBody>;
export type UpdateBoardColumnBody = z.infer<typeof SBoard.UpdateBoardColumnBody>;
export type CreateBoardColumnResponse = z.infer<typeof SBoard.CreateBoardColumnResponse>;

export type ActionResponse = z.infer<typeof SBoard.ActionResponse>;
