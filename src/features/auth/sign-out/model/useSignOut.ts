import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';
import { useRouter } from 'next/navigation';
import { AccessToken } from 'shared/api';
import { routes } from 'shared/config';
import { toast } from 'sonner';

export type UseSignOutOptions = Omit<
  UseMutationOptions<TAuth.SignoutResponse, DefaultError>,
  'mutationFn'
>;

export function useSignOut({ onSuccess, ...rest }: UseSignOutOptions = {}) {
  const router = useRouter();

  return useMutation<Awaited<TAuth.SignoutResponse>, DefaultError, void>({
    ...rest,
    mutationFn: AuthHttp.signout,
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      await context.client.cancelQueries();
      AccessToken.clear();
      context.client.clear();
      router.replace(routes.auth.signin());
      toast.success(res?.message || 'Вы вышли из аккаунта');
    },
  });
}
