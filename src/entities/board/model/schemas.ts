import { createSortingSchema, DateTimeString, GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';

export const ActionResponse = GlobalSuccess;

export const BoardColumnCategoryEnum = z.enum([
  'backlog',
  'active',
  'review',
  'completed',
  'archived',
]);
export const ViewTypeEnum = z.enum(['kanban', 'list', 'calendar', 'gantt']);
export const ColumnStatusEnum = z.enum([
  'backlog',
  'todo',
  'in_progress',
  'review',
  'done',
  'archived',
  'custom',
]);

export const Board = z.object({
  id: z.string().min(1, 'ID не может быть пустым'),
  projectId: z.string().min(1, 'ID проекта обязателен'),
  title: z
    .string()
    .min(1, 'Название области обязательно')
    .max(255, 'Название не должно превышать 255 символов'),
  slug: z
    .string()
    .min(1, 'Slug обязателен')
    .max(100, 'Slug не должен превышать 100 символов')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug должен быть в формате kebab-case'),
  description: z.string().nullable().optional(),
  descriptionHtml: z.string().nullable().optional(),
  color: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Цвет должен быть в HEX формате (#RRGGBB или #RGB)'
    )
    .nullable()
    .optional(),
  icon: z.string().max(20, 'Иконка должна быть не длиннее 20 символов').nullable().optional(),
  tasksCount: z
    .number()
    .int('Количество задач должно быть целым числом')
    .min(0, 'Количество задач не может быть отрицательным'),
  defaultView: ViewTypeEnum,
  position: z
    .number()
    .int('Позиция должна быть целым числом')
    .min(0, 'Позиция не может быть отрицательной'),
  maxTasksLimit: z
    .number()
    .int('Лимит задач должен быть целым числом')
    .positive('Лимит задач должен быть положительным числом')
    .nullable()
    .optional(),
  isLocked: z.boolean(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  createdBy: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export const BoardColumn = z.object({
  id: z.string().min(1, 'ID не может быть пустым'),
  title: z
    .string()
    .min(1, 'Название состояния обязательно')
    .max(255, 'Название не должно превышать 255 символов'),
  description: z.string().nullable().optional(),
  stateType: ColumnStatusEnum,
  category: BoardColumnCategoryEnum,
  color: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Цвет должен быть в HEX формате (#RRGGBB или #RGB)'
    )
    .nullable()
    .optional(),
  icon: z.string().max(20, 'Иконка должна быть не длиннее 20 символов').nullable().optional(),
  orderIndex: z
    .number()
    .int('Порядковый номер должен быть целым числом')
    .min(0, 'Порядковый номер не может быть отрицательным'),
  isVisible: z.boolean(),
  maxTasksLimit: z
    .number()
    .int('Лимит задач должен быть целым числом')
    .positive('Лимит задач должен быть положительным числом')
    .nullable()
    .optional(),
  autoTransitionTo: z.string().nullable().optional(),
  notifyOnEnter: z.boolean(),
  notifyOnExit: z.boolean(),
  isLocked: z.boolean(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  createdBy: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export const CreateBoardBody = Board.omit({
  id: true,
  projectId: true,
  tasksCount: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  deletedAt: true,
})
  .partial({
    description: true,
    descriptionHtml: true,
    color: true,
    icon: true,
    maxTasksLimit: true,
    slug: true,
    defaultView: true,
    position: true,
    isLocked: true,
  })
  .extend({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug должен быть в формате kebab-case')
      .optional(),
  });

export const UpdateBoardBody = CreateBoardBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const CreateBoardColumnBody = BoardColumn.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  deletedAt: true,
}).partial({
  description: true,
  color: true,
  icon: true,
  maxTasksLimit: true,
  autoTransitionTo: true,
  stateType: true,
  category: true,
  orderIndex: true,
  isVisible: true,
  notifyOnEnter: true,
  notifyOnExit: true,
  isLocked: true,
});

export const UpdateBoardColumnBody = CreateBoardColumnBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const BoardColumnQueryParams = z
  .object({
    hidden: z.boolean().optional(),
    counts: z.boolean().optional(),
    my: z.boolean().optional(),
    category: z.string().optional(),
    overdue: z.boolean().optional(),
    page: z.coerce.number().int().positive().optional(),
    offset: z.coerce.number().int().min(0).optional(),
    limit: z.coerce.number().int().min(0).max(100).optional(),
  })
  .extend(createSortingSchema(['order', 'title', 'tasksCount', 'createdAt']).shape)
  .transform((data) => {
    if (data.page && data.page > 1 && data.offset === 0) {
      return {
        ...data,
        offset: (data.page - 1) * (data.limit || 20),
      };
    }
    return data;
  });

export const UpdateBoardColumnResponse = GlobalSuccess;
export const CreateBoardColumnResponse = GlobalSuccess.extend({
  stateId: z.string(),
});
export const BoardListResponse = Board.array();
export const BoardColumnListResponse = BoardColumn.array();

export const CreateBoardResponse = GlobalSuccess;
export const UpdateBoardResponse = GlobalSuccess;
