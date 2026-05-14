import { CAuth } from 'entities/auth';
import { z } from 'zod/v4';

export const ProfileForm = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .min(CAuth.MIN_NAME_LENGTH, 'Слишком короткое имя')
    .max(CAuth.MAX_NAME_LENGTH, 'Слишком длинное имя'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .min(CAuth.MIN_NAME_LENGTH, 'Слишком короткая фамилия')
    .max(CAuth.MAX_NAME_LENGTH, 'Слишком длинная фамилия'),
  bio: z.string().trim().max(512, 'Слишком длинное описание').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof ProfileForm>;