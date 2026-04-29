import { type DefaultError, useMutation } from '@tanstack/react-query';
import { TUser, UserHttp } from 'entities/user';

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
    },
  });
}
