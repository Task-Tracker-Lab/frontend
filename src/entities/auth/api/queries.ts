import { queryOptions } from '@tanstack/react-query';
import type { ConnectedOAuthProvidersResponse, OAuthProvider } from '../model/types';
import { authFabricKeys } from '../model/const';
import { AuthHttp } from './http';

export class AuthQueries {
  static getOAuthProviders() {
    return queryOptions({
      queryKey: authFabricKeys.availableProviders(),
      queryFn: async ({ signal }) => AuthHttp.oAuthProviders(signal),
      staleTime: 60_000 * 360 * 24,
    });
  }
  static getConnectedOAuthProviders() {
    return queryOptions({
      queryKey: authFabricKeys.connectedProviders(),
      queryFn: async ({ signal }) => AuthHttp.connectedOAuthProviders(signal),
      staleTime: 60_000 * 360 * 24,
      select: (data) =>
        data.reduce(
          (acc, v) => {
            acc[v.provider] = v;
            return acc;
          },
          {} as Record<OAuthProvider, ConnectedOAuthProvidersResponse[number]>
        ),
    });
  }
}
