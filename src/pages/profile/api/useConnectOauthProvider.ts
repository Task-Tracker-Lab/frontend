import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, type TAuth } from 'entities/auth';

export type UseConnectOAuthProviderOptions = Omit<
  UseMutationOptions<TAuth.ConnectOAuthProviderResponse, DefaultError, TAuth.OAuthProvider>,
  'mutationFn'
>;

export function useConnectOAuthProvider({ ...rest }: UseConnectOAuthProviderOptions = {}) {
  return useMutation<
    Awaited<TAuth.ConnectOAuthProviderResponse>,
    DefaultError,
    TAuth.OAuthProvider
  >({
    ...rest,
    mutationFn: AuthHttp.connectOAuthProvder,
    meta: {
      skipGlobalValidationToast: true,
    },
  });
}
