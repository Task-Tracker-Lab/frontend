import type { FieldPath } from 'react-hook-form';
import { SignupFormSchema } from '../schemas/signup-form-schema';
import { z } from 'zod';
import { SignupBody } from 'entities/auth';

export const fieldNameMapper = (
  fieldName: FieldPath<z.infer<typeof SignupBody>>
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
