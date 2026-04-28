import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

export const EmailForm = z.object({
  email: SAuth.Email,
});

export const PasswordForm = z
  .object({
    password: SAuth.Password,
    confirmPassword: SAuth.Password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
