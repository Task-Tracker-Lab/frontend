import { DateTimeString, GlobalSuccess } from 'shared/api';
import { PaginatedResponseSchema } from 'shared/api/';
import { z } from 'zod/v4';

export const UserAvatarSchema = z
  .object({
    small: z.string().url(),
    medium: z.string().url(),
    large: z.string().url(),
    original: z.string().url(),
  })
  .nullish();

export const ProfileResponse = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().nullable(),
  bio: z.string().nullable(),
  avatar: UserAvatarSchema,
  headline: z.string().nullable(),
  location: z.string().nullable(),
  phone: z.string().nullable(),
  gender: z
    .enum(['none', 'male', 'female', 'non_binary', 'other', 'prefer_not_to_say'])
    .default('none'),
  vacationStart: z.string().nullable(),
  vacationEnd: z.string().nullable(),
  vacationMessage: z.string().nullable(),
  pronouns: z.enum(['he_him', 'she_her', 'they_them', 'other', 'none']).default('none'),
  pronounsCustom: z.string().max(50, 'Максимальная длина 50 символов').nullable().optional(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const UserResponse = z.object({
  id: z.string(),
  email: z.email(),
  profile: ProfileResponse,
  security: z.object({
    is2faEnabled: z.boolean(),
    lastPasswordChange: DateTimeString,
  }),
  notifications: z.object({
    email: z.object({
      task_assigned: z.boolean(),
      mentions: z.boolean(),
      daily_summary: z.boolean(),
    }),
    push: z.object({
      task_assigned: z.boolean(),
      reminders: z.boolean(),
    }),
  }),
  preferences: z.object({
    timezone: z.string(),
    language: z.string(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
  }),
});

export const NotificationsUpdateBody = z.object({
  email: z
    .object({
      task_assigned: z.boolean(),
      mentions: z.boolean(),
      daily_summary: z.boolean(),
    })
    .optional(),
  push: z
    .object({
      task_assigned: z.boolean(),
      reminders: z.boolean(),
    })
    .optional(),
});

export const NotificationsUpdateResponse = GlobalSuccess;

export const ProfileUpdateBody = z.object({
  firstName: z
    .string()
    .min(1, 'Имя не может быть пустым')
    .max(50, 'Имя слишком длинное')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Фамилия не может быть пустой')
    .max(50, 'Фамилия слишком длинная')
    .optional(),
  middleName: z.string().max(50, 'Отчество слишком длинное').nullable().optional(),
  headline: z.string().max(100, 'Должность слишком длинная').nullable().optional(),
  location: z.string().max(100, 'Локация слишком длинная').nullable().optional(),
  phone: z.string().max(20, 'Номер телефона слишком длинный').nullable().optional(),
  gender: z
    .enum(['none', 'male', 'female', 'non_binary', 'other', 'prefer_not_to_say'])
    .default('none')
    .optional(),
  vacationStart: z.string().nullable().optional(),
  vacationEnd: z.string().nullable().optional(),
  vacationMessage: z.string().max(500, 'Сообщение слишком длинное').nullable().optional(),
  pronouns: z.enum(['he_him', 'she_her', 'they_them', 'other', 'none']).default('none').optional(),
  pronounsCustom: z.string().max(50, 'Максимальная длина 50 символов').nullable().optional(),
  bio: z.string().max(1000, 'О себе не более 1000 символов').nullable().optional(),
  timezone: z.string().max(50).optional(),
  language: z.string().length(2).optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
});

export const ProfileUpdateResponse = GlobalSuccess;

export const TeamPermissions = z.object({
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canManageMembers: z.boolean(),
  canInvite: z.boolean(),
  isOwner: z.boolean(),
});

export const UserTeamResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  avatar: UserAvatarSchema,
  role: z.string(),
  joinedAt: DateTimeString,
  permissions: TeamPermissions,
});

export const UserTeamsListResponse = PaginatedResponseSchema(UserTeamResponse);

export const UserInvitationResponse = z.object({
  code: z.string(),
  teamName: z.string(),
  teamAvatar: UserAvatarSchema,
  role: z.string(),
  inviterName: z.string(),
  expiresAt: DateTimeString,
});

export const UserInvitationListResponse = PaginatedResponseSchema(UserInvitationResponse);

export const UserActivityResponse = z.object({
  id: z.string(),
  eventType: z.string(),
  entityId: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
  createdAt: DateTimeString,
});
