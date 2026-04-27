import { z } from 'zod';

export const ConfirmFormSchema = z.object({
  code: z.string().min(6, 'Обязательное поле'),
});
