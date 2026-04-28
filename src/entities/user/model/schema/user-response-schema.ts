import { z } from 'zod/v4';

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
