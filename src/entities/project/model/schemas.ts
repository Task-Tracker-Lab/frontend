import { DateTimeString, GlobalSuccess, PaginatedResponseSchema } from 'shared/api';
import { HEX_COLOR_REGEX } from 'shared/lib/utils';
import { z } from 'zod/v4';
import { PROJECT_ICONS } from '../config/icons';
import { MEMBER_ROLE, PROJECT_STATUSES, PROJECT_VISIBILITIES } from './consts';

export const ActionResponse = GlobalSuccess;
export const ProjectStatusSchema = z.enum(PROJECT_STATUSES);
export const ProjectVisibilitySchema = z.enum(PROJECT_VISIBILITIES);
export const ProjectMemberRoleSchema = z.enum(MEMBER_ROLE);

const PositiveIntegerSchema = z
  .number()
  .int('Должно быть целым числом')
  .positive('Должно быть положительным числом')
  .nullable()
  .optional();

export const ProjectSettingsSchema = z.object({
  id: z.string().min(1, 'ID не может быть пустым'),
  projectId: z.string().min(1, 'ID проекта обязателен'),
  defaultView: z.enum(['kanban', 'list', 'calendar', 'gantt']),
  taskPrefix: z.string().max(10, 'Префикс не должен превышать 10 символов').nullable().optional(),
  autoCloseDays: PositiveIntegerSchema,
  maxTasksPerArea: PositiveIntegerSchema,
  maxMembers: PositiveIntegerSchema,
  maxAreas: PositiveIntegerSchema,
  allowGuests: z.boolean().default(false),
  timeTracking: z.boolean().default(false),
  timeTrackingMode: z.enum(['optional', 'required', 'disabled']),
  defaultAssigneeId: z.string().nullable().optional(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const CreateProjectSettingsSchema = ProjectSettingsSchema.omit({
  id: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
}).partial({
  defaultView: true,
  timeTrackingMode: true,
});

export const UpdateProjectSettingsSchema = ProjectSettingsSchema.omit({
  id: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const ProjectSchema = z.object({
  id: z.string().min(1, 'ID не может быть пустым'),
  teamId: z.string().nullish(),
  slug: z
    .string()
    .min(1, 'Уникальный идентификатор в URL обязателен')
    .max(100, 'Уникальный идентификатор не должен превышать 100 символов')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Идентификатор должен быть в формате kebab-case (например: "my-project")'
    ),
  name: z
    .string()
    .min(1, 'Название проекта обязательно')
    .max(100, 'Название не должно превышать 100 символов'),
  description: z.string().nullish(),
  descriptionHtml: z.string().nullish(),
  icon: z.enum(PROJECT_ICONS).nullish(),
  color: z
    .string()
    .regex(HEX_COLOR_REGEX, 'Цвет должен быть в HEX формате (#RRGGBB или #RGB)')
    .nullish(),
  status: ProjectStatusSchema,
  visibility: ProjectVisibilitySchema,
  sequence: z
    .number()
    .int('Порядковый номер должен быть целым числом')
    .min(0, 'Порядковый номер не может быть отрицательным'),
  ownerId: z.string().nullish(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  deletedAt: DateTimeString.nullish(),
});

export const CreateProjectBody = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  ownerId: true,
})
  .partial({
    description: true,
    descriptionHtml: true,
    icon: true,
    color: true,
    sequence: true,
    visibility: true,
    slug: true,
  })
  .extend({
    settings: CreateProjectSettingsSchema.optional(),
    slug: z
      .string()
      .max(100, 'Уникальный идентификатор не должен превышать 100 символов')
      .refine(
        (value) => value === '' || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
        'Идентификатор должен быть в формате kebab-case (например: "my-project")'
      )

      .optional(),
  });

export const UpdateProjectBody = CreateProjectBody.extend({
  settings: UpdateProjectSettingsSchema.optional(),
})
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  });

export const CreateProjectResponse = GlobalSuccess.extend({
  slug: z.string(),
});

export const CreateShareTokenBody = z.object({
  ttl: DateTimeString.optional().nullable(),
});

export const CreateShareTokenResponse = GlobalSuccess.extend({
  payload: z.object({
    token: z.string(),
    expiresAt: DateTimeString,
  }),
});

export const ProjectListItemResponse = z
  .object({
    id: z.string(),
    slug: z.string(),
    description: z.string(),
    name: z.string(),
    status: ProjectStatusSchema,
    color: z.string(),
    icon: z.string().nullable(),
    createdAt: DateTimeString,
    role: ProjectMemberRoleSchema,
  })
  .transform((data) => ({ ...data, canEdit: data.role === 'admin' || data.role === 'owner' }));
// TODO: временно добавил canEdit через transform

export const ProjectListResponse = PaginatedResponseSchema(ProjectListItemResponse);

export const ProjectDetailResponse = z
  .object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    status: z.enum(['active', 'archived', 'template', 'deleted']),
    description: z.string().nullable(),
    descriptionHtml: z.string().nullish(),
    visuals: z.object({ color: z.string().nullish(), icon: z.string().nullish().optional() }),
    meta: z.object({
      sequence: z.number().int().nonnegative(),
      createdAt: DateTimeString,
      updatedAt: DateTimeString,
    }),
    access: z.object({
      visibility: z.enum(['public', 'private']),
      currentUserRole: z.enum(['owner', 'admin', 'member', 'viewer']),
      shareUrl: z.string().nullable(),
    }),
    settings: ProjectSettingsSchema.omit({
      id: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .transform((data) => ({
    ...data,
    canEdit: data.access.currentUserRole === 'admin' || data.access.currentUserRole === 'owner',
  }));
// TODO: временно добавил canEdit через transform

export const CheckSlugResponse = z.object({
  available: z.boolean(),
  reason: z.string().nullable(),
});
