import { z } from 'zod';

export const SignoutResponse = z.object({
  success: z.boolean().describe('Статус операции'),
  message: z.string().optional().describe('Сообщение для пользователя'),
});
