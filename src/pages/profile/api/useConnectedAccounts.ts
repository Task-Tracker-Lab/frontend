'use client';
import { useQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth';
import { useMemo } from 'react';

export function useConnectedAccounts() {
  const available = useQuery(AuthQueries.getOAuthProviders());
  const connected = useQuery(AuthQueries.getConnectedOAuthProviders());

  const providers = useMemo(() => {
    if (!available.data) return [];

    const connectedSet = new Set(connected.data?.map((v) => v.provider));

    return available.data.map((item) => ({
      ...item,
      isConnected: connectedSet.has(item.value),
    }));
  }, [available.data, connected.data]);

  return { providers };
}
