import { isAxiosError } from 'axios';
import { isAxiosValidationError } from './AxiosValidationError';
import { GlobalErrorResponseType } from '../errors';

export interface ValidationIssue {
  message: string;
  path: string[];
}

export function extractValidationIssues(err: unknown): ValidationIssue[] {
  // Локальная ошибка валидации (например, от контрактов на клиенте).
  if (isAxiosValidationError(err)) {
    return (err.issues ?? []).map((issue) => ({
      message: issue.message,
      path: issue.path.map(String),
    }));
  }

  // Ошибка валидации с бэкенда.
  if (isAxiosError<GlobalErrorResponseType>(err)) {
    return (
      err.response?.data?.details?.map(({ message, path }) => ({
        message,
        path,
      })) ?? []
    );
  }

  return [];
}
