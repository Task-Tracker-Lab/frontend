import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, type TAuth } from 'entities/auth';

export type UseResendOptions = Omit<
  UseMutationOptions<TAuth.ResendCodeResponse, DefaultError, TAuth.ResendCodeBody>,
  'mutationFn'
>;

export function useResendCode({ ...rest }: UseResendOptions = {}) {
  return useMutation<Awaited<TAuth.ResendCodeResponse>, DefaultError, TAuth.ResendCodeBody>({
    ...rest,
    mutationFn: AuthHttp.resendCode,
    meta: {
      skipGlobalValidationToast: true,
    },
  });
}
