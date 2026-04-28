import type { ValidationIssue } from 'shared/api';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

export function setFormErrors<
  TFormValues extends FieldValues,
  TErrorValues extends FieldValues = TFormValues,
>(
  errors: ValidationIssue[],
  form: Pick<UseFormReturn<TFormValues>, 'setError'>,
  prepareFieldName?: (path: FieldPath<TErrorValues>) => FieldPath<TFormValues>
) {
  if (!form || !Array.isArray(errors)) {
    return;
  }

  errors.forEach(({ message, path: [rawPath] }) => {
    if (!rawPath) {
      return;
    }

    const issuePath = rawPath as FieldPath<TErrorValues>;
    const fieldName = prepareFieldName
      ? prepareFieldName(issuePath)
      : (issuePath as unknown as FieldPath<TFormValues>);

    form.setError(fieldName, { message });
  });
}
