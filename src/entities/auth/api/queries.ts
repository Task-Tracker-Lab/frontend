import { queryOptions } from '@tanstack/react-query';
import { AuthHttp } from './http';

export class AuthQueries {
  static getOAuthProviders() {
    return queryOptions({
      queryKey: ['oauth-providers'],
      queryFn: async () => AuthHttp.oAuthProviders(),
      staleTime: 60_000,
    });
  }
}
