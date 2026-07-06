import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AssetHttp, type TAsset } from 'entities/asset';
import { toast } from 'sonner';

export type UseUploadFileOptions = Omit<
  UseMutationOptions<TAsset.UploadAssetResponse, DefaultError, TAsset.UploadAssetData>,
  'mutationFn'
>;

export function useUploadAvatar({ onSuccess, ...rest }: UseUploadFileOptions = {}) {
  return useMutation<TAsset.UploadAssetResponse, DefaultError, TAsset.UploadAssetData>({
    ...rest,
    mutationFn: AssetHttp.uploadFile,
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Аватар успешно загружен');
    },
  });
}
