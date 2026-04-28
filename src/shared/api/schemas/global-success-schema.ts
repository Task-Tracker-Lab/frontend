import { z } from 'zod/v4';

export const GlobalSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
