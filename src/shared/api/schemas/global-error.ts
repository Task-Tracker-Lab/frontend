import { z } from 'zod/v4';

const ValidationIssue = z
  .object({
    origin: z.string().optional(),
    code: z.string(),
    message: z.string(),
    path: z.array(z.string()),
  })
  .catchall(z.unknown());

export const GlobalError = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    retryable: z.boolean(),
  }),
  details: z.array(ValidationIssue).optional(),
  meta: z
    .object({
      service: z.string().optional(),
      request: z
        .object({
          requestId: z.string(),
          path: z.string(),
          method: z.string(),
          ip: z.string().optional(),
        })
        .optional(),
      timestamp: z.iso.datetime({}),
    })
    .catchall(z.unknown()),
});
