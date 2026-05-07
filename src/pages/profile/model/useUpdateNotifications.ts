import { type DefaultError, useMutation } from '@tanstack/react-query';
import { TUser, userFabricKeys, UserHttp } from 'entities/user';
import { toast } from 'sonner';

interface UseUpdateNotificationsProps {
  onSuccess?: (body: TUser.NotificationsUpdateBody, res: TUser.NotificationsUpdateResponse) => void;
  onError?: (err: Error) => void;
}

export function useUpdateNotifications({ onSuccess, onError }: UseUpdateNotificationsProps = {}) {
  return useMutation<
    Awaited<TUser.NotificationsUpdateResponse>,
    DefaultError,
    TUser.NotificationsUpdateBody
  >({
    mutationFn: UserHttp.updateNotificationsConfig,
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: (res, body) => {
      onSuccess?.(body, res);
      toast.success('Настройки уведомлений обновлены');
    },
    onSettled: async (_d, _e, _v, _m, { client }) =>
      client.invalidateQueries({ queryKey: userFabricKeys.me() }),
  });
}
