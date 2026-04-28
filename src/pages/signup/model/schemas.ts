import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

export const SignupForm = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(100, 'Слишком длинное имя'),
    email: SAuth.Email,
    password: SAuth.Password,
    confirmPassword: SAuth.Password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
