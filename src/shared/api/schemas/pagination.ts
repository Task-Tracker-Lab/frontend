import { z } from 'zod/v4';

export const MetaSchema = z.object({
  next: z.boolean().nullable(),
  hasNext: z.boolean(),
  limit: z.number().int().positive(),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    items: z.array(schema),
    meta: MetaSchema,
  });

const LimitSchema = z.coerce
  .number()
  .int()
  .min(1, 'Лимит должен быть не менее 1')
  .max(100, 'Лимит не может превышать 100')
  .optional();

export const CursorQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: LimitSchema,
});
