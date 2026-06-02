import { DateTimeString, GlobalSuccess, PaginatedResponseSchema } from 'shared/api';
import { z } from 'zod/v4';

const ColumnStatusEnum = z.enum(['backlog', 'todo', 'in_progress', 'done', 'cancelled']);
const ViewTypeEnum = z.enum(['kanban', 'calendar', 'gantt_matrix']);
const Settings = z.record(z.string(), z.string()).default({});

export const BoardColumn = z.object({
  id: z.string(),
  boardId: z.string(),
  name: z.string(),
  position: z.number(),
  status: ColumnStatusEnum,
  color: z.string(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const BoardView = z.object({
  id: z.string(),
  boardId: z.string(),
  type: ViewTypeEnum,
  name: z.string(),
  settings: z.record(z.string(), z.string()),
  position: z.number(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const Board = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  settings: z.record(z.string(), z.string()),
  position: z.number(),
  ownerId: z.string(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  boardColumns: z.array(BoardColumn),
  boardViews: z.array(BoardView),
});

// Board Columns
// export const BoardColumnsResponse = z.object();
// export const BoardColumnByIdResponse = z.object();

// export const CreateBoardColumnsBody = z.object();
// export const UpdateBoardColumnByIdBody = z.object();

// export const DeleteBoardColumnByIdResponse = z.object();

// Boards

export const BoardListResponse = PaginatedResponseSchema(Board);
// export const BoardByIdResponse = z.object();

// export const UpdateBoardBody = z.object();
export const CreateBoardBody = z.object({
  name: z.string(),
  position: z.number(),
  settings: Settings,
});
export const CreateBoardResponse = GlobalSuccess.extend({ boardId: z.string() });
