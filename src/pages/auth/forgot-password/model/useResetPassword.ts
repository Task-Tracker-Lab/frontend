import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export type UseResetePasswordOptions = Omit<
  UseMutationOptions<TAuth.ResetPasswordResponse, DefaultError, TAuth.ResetPasswordBody>,
  'mutationFn'
>;

export function useResetPassword(props: UseResetePasswordOptions = {}) {
  return useMutation<Awaited<TAuth.ResetPasswordResponse>, DefaultError, TAuth.ResetPasswordBody>({
    mutationKey: [],
    mutationFn: AuthHttp.resetPassword,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...props,
  });
}
