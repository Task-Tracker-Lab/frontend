import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { type TUser, userFabricKeys, UserHttp } from 'entities/user';
import { toast } from 'sonner';

type UseUpdateProfileProps = Omit<
  UseMutationOptions<TUser.ProfileUpdateResponse, DefaultError, TUser.ProfileUpdateBody>,
  'mutationFn'
>;

export function useUpdateProfile({ onSuccess, onSettled, ...rest }: UseUpdateProfileProps = {}) {
  return useMutation<TUser.ProfileUpdateResponse, DefaultError, TUser.ProfileUpdateBody>({
    ...rest,
    mutationFn: UserHttp.updateUserConfig,
    onSuccess: (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Профиль успешно обновлен');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.me() });
    },
  });
}
