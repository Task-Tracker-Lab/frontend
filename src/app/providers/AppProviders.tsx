import { PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';
import { Toaster, TooltipProvider } from 'shared/ui';
import { FrontendObservability } from 'shared/config/';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <FrontendObservability />
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
      <Toaster richColors />
    </>
  );
}
