import { z } from 'zod/v4';

export const RefreshTokenResponse = z.object({
  success: z.boolean(),
  token: z.string(),
  message: z.string().optional(),
});
