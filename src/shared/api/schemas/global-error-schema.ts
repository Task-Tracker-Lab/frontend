import { z } from 'zod';

const ValidationIssueSchema = z
  .object({
    origin: z.string().optional(),
    code: z.string(),
    message: z.string(),
    path: z.array(z.string()),
  })
  .catchall(z.unknown());

export const GlobalErrorSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    retryable: z.boolean(),
  }),
  details: z.array(ValidationIssueSchema).optional(),
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
      debug: z
        .object({
          stack: z.string().optional(),
        })
        .optional(),
    })
    .catchall(z.unknown()),
});
