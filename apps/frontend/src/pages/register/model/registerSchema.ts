import { z } from 'zod';

export const formSchema = z
  .object({
    email: z.email('Неверный формат email'),
    name: z.string().min(2, 'Слишком короткое имя').max(15, 'Слишком длинное имя'),
    password: z.string().min(6, 'Минимум 6 символов').max(32, 'Слишком длинный пароль'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Необходимо принять условия использования',
    }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type FormState = z.infer<typeof formSchema>;
