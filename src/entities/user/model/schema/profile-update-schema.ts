import { z } from 'zod';
import { GlobalSuccessSchema } from 'shared/api';

export const ProfileUpdateBody = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  middleName: z.string().max(50).nullish(),
  bio: z.string().max(512).nullish(),
  timezone: z.string().max(50).optional(),
  language: z.string().min(2).max(2).optional(),
});

export const ProfileUpdateResponse = GlobalSuccessSchema;
