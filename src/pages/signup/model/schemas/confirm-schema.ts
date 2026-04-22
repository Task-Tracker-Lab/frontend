import { z } from 'zod';

export const ConfirmBody = z
  .object({
    email: z.email().describe('Email пользователя, на который был отправлен код'),
    code: z.string().min(6).max(6).describe('6-значный OTP код подтверждения'),
  })
  .describe('Схема верификации OTP кода');

export const ConfirmResponse = z.object({
  success: z.boolean().describe('Успешное подтверждение'),
  token: z.string().describe('Token (JWT)'),
  message: z.string().optional().describe('Дополнительное сообщение (опционально)'),
});

export const ConfirmFormSchema = z.object({
  code: z.string().min(6, 'Обязательное поле'),
});
