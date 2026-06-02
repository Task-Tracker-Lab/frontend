import { DateTimeString, GlobalSuccess, PaginatedResponseSchema } from 'shared/api';
import { z } from 'zod/v4';

export const ActionResponse = GlobalSuccess;

export const ColumnStatusEnum = z.enum(['backlog', 'todo', 'in_progress', 'done', 'canceled']);
export const ViewTypeEnum = z.enum(['kanban', 'calendar', 'gantt_matrix']);
export const Settings = z.record(z.string(), z.unknown());

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
  settings: Settings,
  position: z.number(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const Board = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  settings: Settings,
  position: z.number(),
  ownerId: z.string().nullable(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  boardColumns: z.array(BoardColumn),
  boardViews: z.array(BoardView),
});

export const BoardListResponse = PaginatedResponseSchema(Board);
export const BoardColumnListResponse = PaginatedResponseSchema(BoardColumn);
export const BoardViewListResponse = PaginatedResponseSchema(BoardView);

export const CreateBoardBody = z.object({
  name: z
    .string()
    .min(1, 'Название доски не может быть пустым')
    .max(100, 'Название доски не должно превышать 100 символов'),
  position: z.number(),
  settings: Settings.optional(),
});

export const UpdateBoardBody = CreateBoardBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const CreateBoardResponse = GlobalSuccess.extend({ boardId: z.string() });

export const CreateBoardViewBody = z.object({
  type: ViewTypeEnum,
  name: z
    .string()
    .min(1, 'Название представления не может быть пустым')
    .max(100, 'Название представления не должно превышать 100 символов'),
  settings: Settings.optional(),
  position: z.number(),
});

export const UpdateBoardViewBody = CreateBoardViewBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const CreateBoardViewResponse = GlobalSuccess.extend({
  viewId: z.string(),
});

export const CreateBoardColumnBody = z.object({
  name: z
    .string()
    .min(1, 'Название колонки не может быть пустым')
    .max(50, 'Название колонки не должно превышать 50 символов'),
  position: z.number(),
  color: z
    .string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .optional(),
});

export const UpdateBoardColumnBody = CreateBoardColumnBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const CreateBoardColumnResponse = GlobalSuccess.extend({
  columnId: z.string(),
});
