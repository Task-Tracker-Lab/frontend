import { z } from 'zod/v4';

export const MetaSchema = z.object({
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  total: z.number(),
  totalPages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    items: z.array(schema),
    meta: MetaSchema,
  });
