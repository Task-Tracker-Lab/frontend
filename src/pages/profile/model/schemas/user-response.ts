import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.string().describe('Уникальный идентификатор (CUID/UUID)'),
  email: z.email().describe('Электронная почта'),
  profile: z.object({
    firstName: z.string().describe('Имя пользователя'),
    lastName: z.string().describe('Фамилия'),
    middleName: z.string().nullable().describe('Отчество'),
    bio: z.string().nullable().describe('О себе'),
    avatarUrl: z.url().nullable().describe('Ссылка на аватар в S3'),
    timezone: z.string().describe('Временная зона'),
    language: z.string().describe('Язык интерфейса'),
    createdAt: z.iso.datetime({}).describe('Дата регистрации'),
    updatedAt: z.iso.datetime({}).describe('Дата последнего обновления профиля'),
  }),
  security: z
    .object({
      is2faEnabled: z.boolean().describe('Статус двухфакторной аутентификации'),
      lastPasswordChange: z.iso.datetime({}).describe('Дата последнего изменения пароля'),
    })
    .describe('Данные безопасности аккаунта'),
  notifications: z
    .object({
      email: z.object({
        task_assigned: z.boolean().describe('Уведомление на п��чту при назначении задачи'),
        mentions: z.boolean().describe('Уведомление на почту при упоминании в комментариях'),
        daily_summary: z.boolean().describe('Ежедневная сводка задач на почту'),
      }),
      push: z.object({
        task_assigned: z.boolean().describe('Push-уведомление при назначении задачи'),
        reminders: z.boolean().describe('Push-уведомления о дедлайнах'),
      }),
    })
    .describe('Настройки уведомлений пользователя'),
});

export type UserResponseSchemaType = z.infer<typeof UserResponseSchema>;
