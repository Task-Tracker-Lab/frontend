import { type ChangeEvent, useRef } from 'react';
import { type TAsset } from 'entities/asset';
import { useUploadAvatar, type UseUploadFileOptions } from './useUploadAvatar';

function useAvatarFileInput(
  context: TAsset.UploadAssetData['context'],
  mutationOptions?: UseUploadFileOptions
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarMutation = useUploadAvatar(mutationOptions);

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadAvatarMutation.mutate({ file, context });
    event.target.value = '';
  };

  return {
    fileInputRef,
    handleAvatarPick,
    handleAvatarChange,
    isPending: uploadAvatarMutation.isPending,
  };
}

export { useAvatarFileInput };
