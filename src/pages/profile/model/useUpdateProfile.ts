import { type DefaultError, useMutation } from '@tanstack/react-query';
import { TUser, UserHttp } from 'entities/user';

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
    onSuccess: (res, body) => {
      onSuccess?.(body, res);
    },
  });
}
