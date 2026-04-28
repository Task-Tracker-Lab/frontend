import { z } from 'zod/v4';
import { GlobalSuccessSchema } from 'shared/api';

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

export const NotificationsUpdateResponse = GlobalSuccessSchema;
