import { z } from 'zod/v4';

export const createSortingSchema = <T extends readonly [string, ...(readonly string[])]>(
  fields: T
) =>
  z.object({
    sortBy: z.enum(fields).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  });
