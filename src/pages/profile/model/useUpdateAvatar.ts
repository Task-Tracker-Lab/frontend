import { type DefaultError, useMutation } from '@tanstack/react-query';
import { TUser, UserHttp } from 'entities/user';
import { toast } from 'sonner';

interface UseUpdateAvatarProps {
  onSuccess?: (file: File, res: TUser.AvatarUpdateResponse) => void;
  onError?: (err: Error) => void;
}

export function useUpdateAvatar({ onSuccess, onError }: UseUpdateAvatarProps = {}) {
  return useMutation<Awaited<TUser.AvatarUpdateResponse>, DefaultError, File>({
    mutationFn: UserHttp.updateAvatar,
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: async (res, file) => {
      onSuccess?.(file, res);
      toast.success(res.message ?? 'Профиль успешно обновлен');
    },
  });
}
