import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export type UseSigninOptions = Omit<
  UseMutationOptions<TAuth.SigninResponse, DefaultError, TAuth.SigninBody>,
  'mutationFn'
>;

export function useSignin(options: UseSigninOptions = {}) {
  return useMutation<Awaited<TAuth.SigninResponse>, DefaultError, TAuth.SigninBody>({
    mutationFn: AuthHttp.signin,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...options,
  });
}
