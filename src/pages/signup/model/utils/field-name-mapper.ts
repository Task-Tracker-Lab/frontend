import type { FieldPath } from 'react-hook-form';
import { SignUpBody, SignupFormSchema } from '../schemas/SignupSchema';
import { z } from 'zod';

export const fieldNameMapper = (
  fieldName: FieldPath<z.infer<typeof SignUpBody>>
): FieldPath<z.infer<typeof SignupFormSchema>> => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
    case 'middleName':
      return 'name';
    default:
      return fieldName;
  }
};
