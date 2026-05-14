import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AssetHttp, TAsset } from 'entities/asset';

export type UseUploadFileOptions = Omit<
  UseMutationOptions<TAsset.UploadAssetResponse, DefaultError, TAsset.UploadAssetData>,
  'mutationFn'
>;

export function useUploadAvatar({ onSuccess, onError, ...rest }: UseUploadFileOptions = {}) {
  return useMutation<TAsset.UploadAssetResponse, DefaultError, TAsset.UploadAssetData>({
    ...rest,
    mutationFn: AssetHttp.uploadFile,
    onError: (...args) => {
      onError?.(...args);
    },
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Аватар успешно загружен');
    },
  });
}
