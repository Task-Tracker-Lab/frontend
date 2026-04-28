import { z } from 'zod/v4';

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .min(2, 'Слишком короткое имя')
    .max(100, 'Слишком длинное имя'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .min(2, 'Слишком короткая фамилия')
    .max(100, 'Слишком длинная фамилия'),
  bio: z.string().trim().max(512, 'Слишком длинное описание').optional().or(z.literal('')),
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;
