import { z } from 'zod';

export const GlobalSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
