import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

const MAX_FULL_NAME_WORDS = 2;

export const SignupForm = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(100, 'Слишком длинное имя')
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
