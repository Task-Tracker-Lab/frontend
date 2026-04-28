import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

interface UseSignOutProps {
  onSuccess?: (res: TAuth.SignoutResponse) => void;
  onError?: (err: Error) => void;
}

export function useSignOut({ onSuccess, onError }: UseSignOutProps = {}) {
  return useMutation<Awaited<TAuth.SignoutResponse>, DefaultError, void>({
    mutationFn: AuthHttp.signout,
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: (res) => {
      onSuccess?.(res);
    },
  });
}
