import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

export function useSignupConfirm() {
  return useMutation<Awaited<TAuth.SignupConfirmResponse>, DefaultError, TAuth.SignupConfirmBody>({
    mutationFn: AuthHttp.signupConfirm,
    meta: {
      skipGlobalValidationToast: true,
    },
  });
}
