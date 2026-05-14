import { z } from 'zod/v4';
import { CAuth, SAuth } from 'entities/auth';

const MAX_FULL_NAME_WORDS = 2;

export const SignupForm = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Обязательное поле')
      .min(CAuth.MIN_NAME_LENGTH, 'Слишком короткое имя')
      .max(CAuth.MAX_NAME_LENGTH, 'Слишком длинное имя')
      .refine((name) => name.split(/\s+/).length <= MAX_FULL_NAME_WORDS, {
        message: 'Введите только имя и фамилию',
      }),
    email: SAuth.Email,
    password: SAuth.Password,
    confirmPassword: SAuth.Password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
