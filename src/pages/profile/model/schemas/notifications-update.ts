import { z as zod, z } from 'zod';

export const NotificationsUpdateSchema = zod
  .object({
    email: zod
      .object({
        task_assigned: zod.boolean().describe('Уведомление на почту при назначении задачи'),
        mentions: zod.boolean().describe('Уведомление на почту при упоминании в комментариях'),
        daily_summary: zod.boolean().describe('Ежедневная сводка задач на почту'),
      })
      .optional(),
    push: zod
      .object({
        task_assigned: zod.boolean().describe('Push-уведомление при назначении задачи'),
        reminders: zod.boolean().describe('Push-уведомления о дедлайнах'),
      })
      .optional(),
  })
  .describe('Схема для частичного обновления настроек уведомлений');

export type NotificationsUpdateSchemaType = z.infer<typeof NotificationsUpdateSchema>;
