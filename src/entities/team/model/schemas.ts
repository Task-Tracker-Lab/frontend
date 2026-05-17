import { GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';

export const TeamAvatarSchema = z
  .object({
    small: z.string().url(),
    medium: z.string().url(),
    large: z.string().url(),
    original: z.string().url(),
  })
  .nullish();

export const TeamRole = z.enum([
  'owner',
  'admin', // управление юзерами, настройками
  'lead', // управление проектами
  'moderator', // чистка контента/сообщений
  'member', // обычный работяга
  'viewer', // просто смотрит
]);

export const MemberStatus = z.enum([
  'active', // Полноценный участник
  'banned', // Заблокирован не может вернуться по инвайту
  'inactive', // Доступ закрыт, но запись сохранена
]);

export const CreateTeamBody = z.object({
  name: z
    .string()
    .min(1, 'Укажите название команды')
    .min(2, 'Название должно содержать не менее 2 символов')
    .max(100, 'Название не может быть длиннее 100 символов'),
  description: z
    .string()
    .min(1, 'Добавьте описание команды')
    .min(10, 'Описание должно содержать не менее 10 символов')
    .max(256, 'Описание не может быть длиннее 256 символов'),
  slug: z
    .string()
    .max(100, 'Короткий адрес в ссылке не может быть длиннее 100 символов')
    .optional(),
  tags: z
    .array(z.string())
    .optional()
    .superRefine((items, ctx) => {
      if (!items) return;
      const hasDuplicates = new Set(items.map((item) => item.toLowerCase())).size !== items.length;
      if (hasDuplicates) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Теги в списке не должны повторяться',
        });
      }
    }),
});

export const UpdateTeamBody = CreateTeamBody.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  }
);

export const CheckSlugResponse = z.object({
  available: z.boolean(),
  message: z.string().optional(),
});

export const TeamDetailsResponse = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  avatar: TeamAvatarSchema,
  coverUrl: z.string().nullable(),
  ownerId: z.string().nullable(),
  createdAt: z.iso.datetime({}),
  updatedAt: z.iso.datetime({}),
  deletedAt: z.iso.datetime({}).nullable(),
});

export const TeamInvitationResponse = z.object({
  code: z.string(),
  teamId: z.string(),
  teamName: z.string(),
  avatar: TeamAvatarSchema,
  email: z.email(),
  role: TeamRole,
  inviterId: z.string(),
  inviterName: z.string(),
  createdAt: z.iso.datetime({}),
  expiresAt: z.iso.datetime({}),
});

export const InviteMemberBody = z.object({
  email: z.email(),
  role: TeamRole,
});

export const UpdateInvitationBody = z.object({
  role: TeamRole,
});

export const TeamMemberResponse = z.object({
  id: z.string(),
  role: TeamRole,
  status: MemberStatus,
  email: z.email(),
  middleName: z.string().nullable(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: TeamAvatarSchema,
  initials: z.string().max(2),
  joinedAt: z.iso.datetime({}),
});

export const UpdateMemberBody = z
  .object({
    role: TeamRole.optional(),
    status: MemberStatus.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  });

export const SyncTagsBody = z.object({
  tags: z
    .array(z.string())
    .min(1, 'Список тегов не может быть пустым')
    .max(15, 'Нельзя добавить более 15 тегов за раз')
    .superRefine((items, ctx) => {
      const hasDuplicates = new Set(items.map((item) => item.toLowerCase())).size !== items.length;
      if (hasDuplicates) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Теги в списке не должны повторяться (регистр не важен)',
        });
      }
    }),
});

export const ActionResponse = GlobalSuccess;

export const CreateProjectBody = z.object({
  name: z.string().min(1).max(100),
  key: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Z0-9]+$/),
  description: z.string().max(2000).optional().nullable(),
  icon: z.string().optional().nullable(),
  color: z
    .string()
    .regex(/^#[A-Fa-f0-9]{6}$/)
    .optional(),
  visibility: z.enum(['public', 'private']).default('public'),
});

export const UpdateProjectBody = CreateProjectBody.extend({
  status: z.enum(['active', 'archived']).optional(),
  isPublic: z.boolean().optional(),
})
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  });

export const CreateProjectResponse = GlobalSuccess.extend({
  projectId: z.string(),
});

export const CreateShareTokenBody = z.object({
  ttl: z.iso.datetime({}).optional().nullable(),
});

export const ProjectListItemResponse = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  status: z.enum(['active', 'archived', 'template']),
  color: z.string(),
  icon: z.string().nullable(),
  createdAt: z.iso.datetime({}),
  canEdit: z.boolean(),
});

export const ProjectListResponse = z.object({
  team: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    role: z.string(),
  }),
  items: ProjectListItemResponse.array(),
  meta: z.object({ total: z.number() }),
});

export const ProjectDetailResponse = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  status: z.enum(['active', 'archived', 'template']),
  description: z.string().nullable(),
  visuals: z.object({ color: z.string(), icon: z.string().nullable() }),
  meta: z.object({
    taskSequence: z.number(),
    createdAt: z.iso.datetime({}),
    updatedAt: z.iso.datetime({}),
  }),
  access: z.object({
    visibility: z.enum(['public', 'private']),
    canEdit: z.boolean(),
    canDelete: z.boolean(),
    shareUrl: z.string().nullable(),
  }),
  settings: z.record(z.string(), z.unknown()),
});
