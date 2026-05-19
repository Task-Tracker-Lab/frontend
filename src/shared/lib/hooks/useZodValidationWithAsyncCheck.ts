import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import type { FieldErrors, FieldValues, Resolver, ResolverOptions } from 'react-hook-form';
import { ZodType } from 'zod/v4';

export function useZodValidationWithAsyncCheck<Input extends FieldValues, Context, Output>(
  schema: ZodType<Output, Input>,
  asyncValidate?: (
    values: Input,
    context: Context | undefined,
    options: ResolverOptions<Input>
  ) => Promise<FieldErrors<Input>>
): Resolver<Input, Context, Output | Input> {
  return useCallback(
    async (values: Input, context, options) => {
      const data = await zodResolver(schema)(values, context, options);

      const asyncErrors = await asyncValidate?.(values, context, options);

      if (!asyncErrors || Object.keys(asyncErrors).length === 0) {
        return data;
      }

      return {
        values: {},
        errors: {
          ...data.errors,
          ...asyncErrors,
        },
      };
    },
    [asyncValidate, schema]
  );
}
