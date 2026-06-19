import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { type TUser, userFabricKeys, UserHttp } from 'entities/user';
import { toast } from 'sonner';

type UseUpdateNotificationsProps = Omit<
  UseMutationOptions<
    TUser.NotificationsUpdateResponse,
    DefaultError,
    TUser.NotificationsUpdateBody
  >,
  'mutationFn'
>;

export function useUpdateNotifications({
  onSettled,
  onSuccess,
  ...props
}: UseUpdateNotificationsProps = {}) {
  return useMutation<
    TUser.NotificationsUpdateResponse,
    DefaultError,
    TUser.NotificationsUpdateBody
  >({
    ...props,
    mutationFn: UserHttp.updateNotificationsConfig,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      toast.success('Настройки уведомлений обновлены');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.me() });
    },
  });
}
