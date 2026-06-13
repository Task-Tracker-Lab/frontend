import { PropsWithChildren, Suspense } from 'react';
import { QueryProvider } from './QueryProvider';
import { Toaster, TooltipProvider } from 'shared/ui';
import { FrontendObservability } from 'shared/config/';
import { QueryParamsHandler } from './QueryParamsHandler';
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <FrontendObservability />
      <QueryProvider>
        <TooltipProvider>
          <Suspense>
            <QueryParamsHandler />
          </Suspense>
          {children}
        </TooltipProvider>
      </QueryProvider>
      <Toaster richColors />
    </>
  );
}
