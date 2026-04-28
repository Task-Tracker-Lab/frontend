import { z } from 'zod';

export const EmailSchema = z
  .string()
  .min(1, 'Обязательное поле')
  .check(z.email('Неверный формат email'));
