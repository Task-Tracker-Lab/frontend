import { z } from 'zod/v4';

export const EmailSchema = z
  .string()
  .min(1, 'Обязательное поле')
  .check(z.email('Неверный формат email'));
