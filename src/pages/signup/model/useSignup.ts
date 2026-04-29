import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

interface UseSignupProps {
  onSuccess?: (body: TAuth.SignupBody, res: TAuth.SignupResponse) => void;
  onError?: (err: Error) => void;
}

export function useSignup({ onSuccess, onError }: UseSignupProps = {}) {
  return useMutation<Awaited<TAuth.SignupResponse>, DefaultError, TAuth.SignupBody>({
    mutationFn: AuthHttp.signup,
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
