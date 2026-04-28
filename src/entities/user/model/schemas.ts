import { z } from 'zod/v4';
import { GlobalSuccess } from 'shared/api';

export const UserResponse = z.object({
  id: z.string(),
  email: z.email(),
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().nullable(),
    bio: z.string().nullable(),
    avatarUrl: z.url().nullable(),
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

export const AvatarUpdateResponse = GlobalSuccess;

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
