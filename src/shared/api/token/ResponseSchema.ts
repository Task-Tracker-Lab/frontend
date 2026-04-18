import { z } from 'zod';

export const RefreshTokenResponse = z
  .object({
    success: z.boolean().describe('Успешное обновление токенов'),
    token: z.string().describe('Новый access token (JWT)'),
    message: z.string().optional().describe('Дополнительное сообщение (опционально)'),
  })
  .describe('Ответ при обновлении пары access/refresh токенов');
