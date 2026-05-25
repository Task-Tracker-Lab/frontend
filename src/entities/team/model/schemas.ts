import { DateTimeString, GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';
import { MAX_SLUG_LENGTH, MIN_SLUG_LENGTH } from './const';

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
    .max(500, 'Описание не может быть длиннее 500 символов'),
  slug: z
    .string()
    .optional()
    .transform((val) => (val === '' || val === undefined ? undefined : val))
    .pipe(
      z
        .string()
        .min(
          MIN_SLUG_LENGTH,
          `Короткий адрес должен содержать не менее ${MIN_SLUG_LENGTH} символов`
        )
        .max(
          MAX_SLUG_LENGTH,
          `Короткий адрес в ссылке не может быть длиннее ${MAX_SLUG_LENGTH} символов`
        )
        .optional()
    ),
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
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
  deletedAt: DateTimeString.nullable(),
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
  createdAt: DateTimeString,
  expiresAt: DateTimeString,
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
  joinedAt: DateTimeString,
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

export const ActionResponse = GlobalSuccess;
