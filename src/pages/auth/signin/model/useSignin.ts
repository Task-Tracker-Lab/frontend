import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

interface UseSigninProps {
  onSuccess?: (body: TAuth.SigninBody, res: TAuth.SigninResponse) => void;
  onError?: (err: Error) => void;
}

export function useSignin({ onSuccess, onError }: UseSigninProps = {}) {
  return useMutation<Awaited<TAuth.SigninResponse>, DefaultError, TAuth.SigninBody>({
    mutationFn: AuthHttp.signin,
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
