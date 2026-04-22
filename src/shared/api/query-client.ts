import { isAxiosError } from 'axios';
import { AxiosValidationError, GlobalErrorResponseType } from 'shared/api/validation';
import { toast } from 'sonner';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

interface AppQueryMeta extends Record<string, unknown> {
  skipGlobalErrorToast?: boolean;
  skipGlobalValidationToast?: boolean;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: AppQueryMeta;
    mutationMeta: AppQueryMeta;
  }
}

const SERVER_BAD_VALIDATION_CODE = 'VALIDATION_FAILED';

function handleValidationError(error: unknown, meta?: AppQueryMeta): boolean {
  if (!(error instanceof AxiosValidationError)) return false;
  if (error.code !== AxiosValidationError.ERR_BAD_VALIDATION) return false;
  if (meta?.skipGlobalValidationToast) return true;

  toast.error(error.message, { description: error.issues?.[0]?.message });
  return true;
}

function handleServerError(error: unknown, meta?: AppQueryMeta): boolean {
  if (!isAxiosError<GlobalErrorResponseType>(error)) return false;

  const data = error.response?.data;

  if (!data) return false;

  if (data.error.code === SERVER_BAD_VALIDATION_CODE && meta?.skipGlobalValidationToast)
    return true;

  if (meta?.skipGlobalErrorToast) return true;

  toast.error(data.error.message, { description: data.details?.[0]?.message });
  return true;
}

function handleGlobalError(error: unknown, meta: AppQueryMeta | undefined, title: string): void {
  if (meta?.skipGlobalErrorToast) return;

  const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
  toast.error(title, { description: message });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (handleValidationError(error, query.meta)) return;
      if (handleServerError(error, query.meta)) return;
      handleGlobalError(error, query.meta, 'Ошибка загрузки данных');
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (handleValidationError(error, mutation.meta)) return;
      if (handleServerError(error, mutation.meta)) return;
      handleGlobalError(error, mutation.meta, 'Ошибка выполнения операции');
    },
  }),
});
