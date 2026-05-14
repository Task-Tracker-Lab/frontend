import { z } from 'zod/v4';
import { GlobalSuccess } from 'shared/api';

export const UserAvatarSchema = z
  .object({
    small: z.string().url(),
    medium: z.string().url(),
    large: z.string().url(),
    original: z.string().url(),
  })
  .nullish();

export const UserResponse = z.object({
  id: z.string(),
  email: z.email(),
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().nullable(),
    bio: z.string().nullable(),
    avatar: UserAvatarSchema,
    timezone: z.string(),
    language: z.string(),
    createdAt: z.iso.datetime({}),
    updatedAt: z.iso.datetime({}),
  }),
  security: z.object({
    is2faEnabled: z.boolean(),
    lastPasswordChange: z.iso.datetime({}),
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
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  middleName: z.string().max(50).nullish(),
  bio: z.string().max(512).nullish(),
  timezone: z.string().max(50).optional(),
  language: z.string().min(2).max(2).optional(),
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
  slug: z.string(),
  description: z.string(),
  avatar: UserAvatarSchema,
  role: z.string(),
  joinedAt: z.iso.datetime({}),
  permissions: TeamPermissions,
});

export const UserInviteResponse = z.object({
  code: z.string(),
  teamName: z.string(),
  teamAvatar: UserAvatarSchema,
  role: z.string(),
  inviterName: z.string(),
  expiresAt: z.iso.datetime({}),
});
