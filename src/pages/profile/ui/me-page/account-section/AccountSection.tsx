import { CardSection } from 'shared/ui';
import { OAuthManageButton } from './OAuthManageButton';
import { AuthQueries } from 'entities/auth';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AccountSectionFallback } from './AccountSectionFallback';
import { AccountSectionErrorFallback } from './AccountSectionErrorFallback';

export function AccountSection() {
  const providers = useQuery(AuthQueries.getOAuthProviders());
  const connected = useQuery(AuthQueries.getConnectedOAuthProviders());

  const connectedSet = useMemo(
    () => new Set(connected.data?.map((v) => v.provider)),
    [connected.data]
  );

  if (providers.error) return <AccountSectionErrorFallback />;
  if (providers.isLoading) return <AccountSectionFallback />;

  return (
    <CardSection
      className="flex flex-col"
      title="Связанные аккаунты"
      description="Управление привязкой к социальным сетям и сервисам"
    >
      {providers.data?.map((provider) => {
        const isConnected = connectedSet.has(provider.value);
        return (
          <OAuthManageButton
            key={provider.value}
            isLoading={connected.isLoading}
            status={connected.isError ? 'unknown' : isConnected ? 'connected' : 'disconnected'}
            provider={provider.value}
            label={provider.label}
          />
        );
      })}
    </CardSection>
  );
}
