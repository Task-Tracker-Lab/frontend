import { z } from 'zod';

export const SigninBody = z
  .object({
    email: z.email().describe('Email пользователя'),
    password: z.string().describe('Пароль пользователя'),
  })
  .describe('Схема входа в систему');

export const SigninResponse = z.object({
  success: z.boolean().describe('Успешное обновление токенов'),
  token: z.string().describe('Новый access token (JWT)'),
  message: z.string().optional().describe('Дополнительное сообщение (опционально)'),
});
