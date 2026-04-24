'use client';

import { QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'shared/api';

export function QueryProvider({ children, ...props }: Omit<QueryClientProviderProps, 'client'>) {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}
