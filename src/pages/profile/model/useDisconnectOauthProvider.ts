import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export type UseDisconnectOAuthProviderOptions = Omit<
  UseMutationOptions<TAuth.RemoveOAuthProviderResponse, DefaultError, TAuth.OAuthProvider>,
  'mutationFn'
>;

export function useDisconnectOAuthProvider({ ...rest }: UseDisconnectOAuthProviderOptions = {}) {
  return useMutation<Awaited<TAuth.RemoveOAuthProviderResponse>, DefaultError, TAuth.OAuthProvider>(
    {
      ...rest,
      mutationFn: AuthHttp.removeOAuthProvder,
      meta: {
        skipGlobalValidationToast: true,
      },
    }
  );
}
