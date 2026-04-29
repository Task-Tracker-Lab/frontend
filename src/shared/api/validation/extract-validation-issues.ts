import { isAxiosError } from 'axios';
import { isAxiosValidationError } from './AxiosValidationError';
import { GlobalError } from '../types';

export interface ValidationIssue {
  message: string;
  path: string[];
}

const VALIDATE_ERRORS_CODE: string[] = ['VALIDATION_FAILED'];

export function extractValidationIssues(err: unknown): ValidationIssue[] {
  // Локальная ошибка валидации (например, от контрактов на клиенте).
  if (isAxiosValidationError(err)) {
    return (err.issues ?? []).map((issue) => ({
      message: issue.message,
      path: issue.path.map(String),
    }));
  }

  // Ошибка валидации с бэкенда.
  if (
    isAxiosError<GlobalError>(err) &&
    VALIDATE_ERRORS_CODE.some((code) => code === err.response?.data?.error?.code)
  ) {
    return (
      err.response?.data?.details?.map(({ message, path }) => ({
        message,
        path,
      })) ?? []
    );
  }

  return [];
}
