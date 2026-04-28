import { z } from 'zod';
import { EmailSchema } from 'entities/auth';

export const EmailFormSchema = z.object({
  email: EmailSchema,
});
