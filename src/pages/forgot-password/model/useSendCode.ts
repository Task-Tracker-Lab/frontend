import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export function useSendCode() {
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
  });
}
