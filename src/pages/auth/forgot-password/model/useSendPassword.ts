import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, type TAuth } from 'entities/auth';

export type UseSendPasswordOptions = Omit<
  UseMutationOptions<
    TAuth.ResetPasswordConfirmResponse,
    DefaultError,
    TAuth.ResetPasswordConfirmBody
  >,
  'mutationFn'
>;

export function useSendPassword(options: UseSendPasswordOptions = {}) {
  return useMutation<
    Awaited<TAuth.ResetPasswordConfirmResponse>,
    DefaultError,
    TAuth.ResetPasswordConfirmBody
  >({
    mutationKey: [],
    mutationFn: AuthHttp.resetPasswordConfirm,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...options,
  });
}
