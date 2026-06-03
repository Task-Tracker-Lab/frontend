import { z } from 'zod/v4';
import { CreateBoardColumnFormSchema } from './schemas';

export type CreateBoardColumnFormValues = z.input<typeof CreateBoardColumnFormSchema>;

export type CreateBoardColumnFormOutput = z.output<typeof CreateBoardColumnFormSchema>;
