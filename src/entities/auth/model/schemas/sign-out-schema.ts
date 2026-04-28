import { z } from 'zod';

export const SignoutResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
