import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(15, 'Слишком длинное имя'),
    email: z.string().min(1, 'Обязательное поле').check(z.email('Неверный формат email')),
    password: z
      .string()
      .min(1, 'Обязательное поле')
      .min(6, 'Минимум 6 символов')
      .max(32, 'Слишком длинный пароль'),
    confirmPassword: z.string().min(1, 'Обязательное поле'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type FormState = z.infer<typeof formSchema>;
