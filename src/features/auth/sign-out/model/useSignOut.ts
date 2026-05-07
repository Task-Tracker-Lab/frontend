import { type DefaultError, useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';
import { useRouter } from 'next/navigation';
import { AccessToken } from 'shared/api';
import { routes } from 'shared/config';
import { toast } from 'sonner';

interface UseSignOutProps {
  onSuccess?: (res: TAuth.SignoutResponse) => void;
  onError?: (err: Error) => void;
}

export function useSignOut({ onSuccess, onError }: UseSignOutProps = {}) {
  const router = useRouter();

  return useMutation<Awaited<TAuth.SignoutResponse>, DefaultError, void>({
    mutationFn: AuthHttp.signout,
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: async (res, _v, _m, { client }) => {
      onSuccess?.(res);

      await client.cancelQueries();
      client.clear();

      AccessToken.clear();

      toast.success(res.message || 'Вы вышли из аккаунта');
      router.replace(routes.auth.signin());
    },
  });
}
