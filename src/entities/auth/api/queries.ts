import { queryOptions } from '@tanstack/react-query';
import { AuthHttp } from './http';
import { authFabricKeys } from '../model/const';

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
    });
  }
}
