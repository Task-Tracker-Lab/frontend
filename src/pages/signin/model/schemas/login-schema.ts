import { z } from 'zod';

const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 32;

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

export const SigninFormSchema = z.object({
  email: z.string().min(1, 'Обязательное поле').check(z.email('Неверный формат email')),
  password: z
    .string()
    .min(1, 'Обязательное поле')
    .min(MIN_PASS_LENGTH, `Минимум ${MIN_PASS_LENGTH} символов`)
    .max(MAX_PASS_LENGTH, 'Слишком длинный пароль'),
});
