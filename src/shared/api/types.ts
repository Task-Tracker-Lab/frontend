import { z } from 'zod/v4';
import * as SApi from './schemas';

export type GlobalSuccess = z.infer<typeof SApi.GlobalSuccess>;
export type GlobalError = z.infer<typeof SApi.GlobalError>;
export type PaginationMeta = z.infer<typeof SApi.MetaSchema>;

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};
