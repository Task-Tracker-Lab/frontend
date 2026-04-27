import { z } from 'zod';

const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 32;

export const SignupBody = z
  .object({
    email: z.email('Некорректный формат email').describe('Email пользователя'),
    password: z
      .string()
      .min(MIN_PASS_LENGTH, `Пароль должен содержать минимум ${MIN_PASS_LENGTH} символов`)
      .max(MAX_PASS_LENGTH, `Пароль должен содержать максимум ${MAX_PASS_LENGTH} символа`)
      .describe('Пароль (минимум 8 символов)'),
    firstName: z
      .string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50)
      .trim()
      .describe('Имя'),
    lastName: z
      .string()
      .min(2, 'Фамилия должна содержать минимум 2 символа')
      .max(50)
      .trim()
      .describe('Фамилия'),
    middleName: z
      .string()
      .max(50)
      .trim()
      .optional()
      .or(z.literal(''))
      .describe('Отчество (опционально)'),
  })
  .describe('Схема регистрации пользователя');

export const SignupResponse = z.object({
  success: z.boolean().describe('Статус операции'),
  message: z.string().optional().describe('Сообщение для пользователя'),
});
