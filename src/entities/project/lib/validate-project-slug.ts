import type { FieldValues, ResolverOptions } from 'react-hook-form';
import type { CheckSlugErrors } from './useCheckSlug';

type SlugFormValues = { slug?: string };

function shouldValidateSlugAsync(names: readonly string[] | undefined): boolean {
  return !names?.length || names.includes('slug');
}

export function validateProjectSlugAsync<T extends FieldValues & SlugFormValues>(
  checkSlug: (value: string) => Promise<CheckSlugErrors>,
  values: T,
  _context: unknown,
  options: ResolverOptions<T>
): Promise<CheckSlugErrors> {
  if (!shouldValidateSlugAsync(options.names as readonly string[] | undefined)) {
    return Promise.resolve({});
  }

  return checkSlug(values.slug ?? '');
}
