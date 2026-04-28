import { z } from 'zod/v4';
import { EmailSchema } from 'entities/auth';

export const EmailFormSchema = z.object({
  email: EmailSchema,
});
