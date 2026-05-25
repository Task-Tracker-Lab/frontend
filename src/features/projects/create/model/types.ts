import { z } from 'zod/v4';
import { CreateProjectFormSchema } from './schemas';

export type CreateProjectFormValues = z.input<typeof CreateProjectFormSchema>;

//todo исправить(должны быть все поля)
export type ProjectIdentityFormValues = Pick<
  CreateProjectFormValues,
  'name' | 'key' | 'description' | 'icon' | 'color'
>;
