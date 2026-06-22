import type { FieldPath } from 'react-hook-form';
import type { SignupFormValues } from '../types';
import { type TAuth } from 'entities/auth';

export const fieldNameMapper = (
  fieldName: FieldPath<TAuth.SignupBody>
): FieldPath<SignupFormValues> => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
    case 'middleName':
      return 'name';
    default:
      return fieldName;
  }
};
