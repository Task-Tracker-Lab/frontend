import { z } from 'zod';

export const formSchema = z.object({
  email: z.email('Неверный формат email'),
  password: z.string().min(6, 'Минимум 6 символов').max(32, 'Слишком длинный пароль'),
});

export type FormState = z.infer<typeof formSchema>;
