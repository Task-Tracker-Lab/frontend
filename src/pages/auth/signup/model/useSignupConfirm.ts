import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, type TAuth } from 'entities/auth';

export type UseSignupConfirmOptions = Omit<
  UseMutationOptions<TAuth.SignupConfirmResponse, DefaultError, TAuth.SignupConfirmBody>,
  'mutationFn'
>;

export function useSignupConfirm(options: UseSignupConfirmOptions = {}) {
  return useMutation<Awaited<TAuth.SignupConfirmResponse>, DefaultError, TAuth.SignupConfirmBody>({
    mutationFn: AuthHttp.signupConfirm,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...options,
  });
}
