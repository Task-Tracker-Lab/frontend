import { toast } from 'sonner';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { ErrorMessage, ErrorUtils } from './errors';
import { AxiosValidationError } from './validation';

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
const LOCAL_BAD_VALIDATION_CODE = AxiosValidationError.ERR_BAD_VALIDATION;

function handleValidationError(error: ErrorMessage, meta?: AppQueryMeta): boolean {
  if (error.code !== SERVER_BAD_VALIDATION_CODE && error.code !== LOCAL_BAD_VALIDATION_CODE) {
    return false;
  }
  if (meta?.skipGlobalValidationToast) return true;

  toast.error(error.message, { description: error.description[0] });
  return true;
}

function handleGlobalError(error: ErrorMessage, meta?: AppQueryMeta): void {
  if (meta?.skipGlobalErrorToast) return;

  toast.error(error.message, { description: error.description });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const err = ErrorUtils.getErrors(error);

      if (handleValidationError(err, query.meta)) return;

      handleGlobalError(err, query.meta);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const err = ErrorUtils.getErrors(error);

      if (handleValidationError(err, mutation.meta)) return;

      handleGlobalError(err, mutation.meta);
    },
  }),
});
