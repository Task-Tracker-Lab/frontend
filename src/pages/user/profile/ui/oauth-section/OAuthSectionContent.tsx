'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth';
import { QueryParamsHandler } from 'features/handle-query-params';
import { Suspense } from 'react';
import { CardSection } from 'shared/ui';
import { OAuthItem } from './OAuthItem';

export function OAuthSectionContent() {
  const providers = useSuspenseQuery(AuthQueries.getOAuthProviders());
  const connected = useSuspenseQuery(AuthQueries.getConnectedOAuthProviders());

  return (
    <>
      <Suspense>
        <QueryParamsHandler />
      </Suspense>
      <CardSection
        title="Связанные аккаунты"
        description="Управление привязкой к социальным сетям и сервисам"
      >
        <ul className="flex flex-col gap-2" role="list">
          {providers.data?.map((provider) => {
            const isConnected = connected.data[provider.value];
            return (
              <li key={provider.value}>
                <OAuthItem
                  status={isConnected ? 'connected' : 'disconnected'}
                  provider={provider.value}
                  label={provider.label}
                />
              </li>
            );
          })}
        </ul>
      </CardSection>
    </>
  );
}
