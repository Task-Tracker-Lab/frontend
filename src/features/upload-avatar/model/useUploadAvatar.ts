import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TFile, UploadHttp } from 'entities/file';

export type UseUploadFileOptions = Omit<
  UseMutationOptions<TFile.UploadResponse, DefaultError, TFile.UploadFileData>,
  'mutationFn'
>;

export function useUploadAvatar({ onSuccess, onError, ...props }: UseUploadFileOptions = {}) {
  return useMutation<TFile.UploadResponse, DefaultError, TFile.UploadFileData>({
    mutationFn: UploadHttp.uploadFile,
    onError: (...args) => {
      onError?.(...args);
    },
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Аватар успешно загружен');
    },
    ...props,
  });
}
