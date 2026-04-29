import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

interface SendPasswordProps {
  onSuccess?: (
    body: TAuth.ResetPasswordConfirmBody,
    res: TAuth.ResetPasswordConfirmResponse
  ) => void;
  onError?: (err: Error) => void;
}

export function useSendPassword({ onSuccess, onError }: SendPasswordProps = {}) {
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
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: (res, body) => {
      onSuccess?.(body, res);
    },
  });
}
