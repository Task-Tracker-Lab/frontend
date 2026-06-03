import { z } from 'zod/v4';
import { CreateBoardFormSchema } from './schemas';

export type CreateBoardFormValues = z.input<typeof CreateBoardFormSchema>;

export type CreateBoardFormOutput = z.output<typeof CreateBoardFormSchema>;
