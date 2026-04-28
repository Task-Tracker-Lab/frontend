import { z as zod } from 'zod';
import { GlobalSuccessSchema } from 'shared/api';

export const NotificationsUpdateBody = zod.object({
  email: zod
    .object({
      task_assigned: zod.boolean(),
      mentions: zod.boolean(),
      daily_summary: zod.boolean(),
    })
    .optional(),
  push: zod
    .object({
      task_assigned: zod.boolean(),
      reminders: zod.boolean(),
    })
    .optional(),
});

export const NotificationsUpdateResponse = GlobalSuccessSchema;
