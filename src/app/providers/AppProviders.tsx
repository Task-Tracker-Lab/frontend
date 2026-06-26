import { PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';
import { Toaster, TooltipProvider } from 'shared/ui';
import { FrontendObservability } from 'shared/config/';
import { AbilityProvider, SyncAbilityStore } from 'features/ability';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <FrontendObservability />
      <QueryProvider>
        <AbilityProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AbilityProvider>
        <SyncAbilityStore />
      </QueryProvider>
      <Toaster richColors />
    </>
  );
}
