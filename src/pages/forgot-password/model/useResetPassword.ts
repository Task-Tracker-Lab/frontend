import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

interface ResetPasswordProps {
  onSuccess?: (body: TAuth.ResetPasswordBody, res: TAuth.ResetPasswordResponse) => void;
  onError?: (err: Error) => void;
}

export function useResetPassword({ onSuccess, onError }: ResetPasswordProps = {}) {
  return useMutation<Awaited<TAuth.ResetPasswordResponse>, DefaultError, TAuth.ResetPasswordBody>({
    mutationKey: [],
    mutationFn: AuthHttp.resetPassword,
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
