import { z } from 'zod/v4';
import { CreateProjectFormSchema } from './schemas';

export type CreateProjectFormValues = z.input<typeof CreateProjectFormSchema>;
