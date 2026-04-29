import { z } from 'zod/v4';

export const GlobalSuccess = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
