import { z } from 'zod';

const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 32;

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(100, 'Слишком длинное имя'),
    email: z.string().min(1, 'Обязательное поле').check(z.email('Неверный формат email')),
    password: z
      .string()
      .min(1, 'Обязательное поле')
      .min(MIN_PASS_LENGTH, `Минимум ${MIN_PASS_LENGTH} символов`)
      .max(MAX_PASS_LENGTH, 'Слишком длинный пароль'),
    confirmPassword: z.string().min(1, 'Обязательное поле'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
