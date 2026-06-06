import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export type UseSendCodeOptions = Omit<
  UseMutationOptions<
    TAuth.ResetPasswordVerifyResponse,
    DefaultError,
    TAuth.ResetPasswordVerifyBody
  >,
  'mutationFn'
>;

export function useSendCode(props: UseSendCodeOptions = {}) {
  return useMutation<
    Awaited<TAuth.ResetPasswordVerifyResponse>,
    DefaultError,
    TAuth.ResetPasswordVerifyBody
  >({
    mutationKey: [],
    mutationFn: AuthHttp.resetPasswordVerify,
    meta: {
      skipGlobalValidationToast: true,
    },
    ...props,
  });
}
