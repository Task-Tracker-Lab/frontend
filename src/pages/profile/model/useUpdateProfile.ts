import { type DefaultError, useMutation } from '@tanstack/react-query';
import { type TUser, userFabricKeys, UserHttp } from 'entities/user';
import { toast } from 'sonner';

interface UseUpdateProfileProps {
  onSuccess?: (body: TUser.ProfileUpdateBody, res: TUser.ProfileUpdateResponse) => void;
  onError?: (err: Error) => void;
}

export function useUpdateProfile({ onSuccess, onError }: UseUpdateProfileProps = {}) {
  return useMutation<Awaited<TUser.ProfileUpdateResponse>, DefaultError, TUser.ProfileUpdateBody>({
    mutationFn: UserHttp.updateUserConfig,
    onError: (err) => {
      onError?.(err);
    },
    onSuccess: async (res, body) => {
      onSuccess?.(body, res);
      toast.success(res.message ?? 'Профиль успешно обновлен');
    },
    onSettled: async (_d, _e, _v, _m, { client }) =>
      client.invalidateQueries({ queryKey: userFabricKeys.me() }),
  });
}
