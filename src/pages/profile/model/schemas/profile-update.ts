import { z } from 'zod';

export const ProfileUpdateSchema = z
  .object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    middleName: z.string().max(50).nullish(),
    bio: z.string().max(512).nullish(),
    timezone: z.string().max(50).optional(),
    language: z.string().min(2).max(2).optional(),
  })
  .describe('Схема для частичного обновления данных профиля');

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;
