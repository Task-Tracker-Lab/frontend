import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export type UseSignupOptions = Omit<
  UseMutationOptions<TAuth.SignupResponse, DefaultError, TAuth.SignupBody>,
  'mutationFn'
>;

export function useSignup(options: UseSignupOptions = {}) {
  return useMutation<Awaited<TAuth.SignupResponse>, DefaultError, TAuth.SignupBody>({
    mutationFn: AuthHttp.signup,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...options,
  });
}
