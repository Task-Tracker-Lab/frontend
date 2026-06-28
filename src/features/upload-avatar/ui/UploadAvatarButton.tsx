'use client';

import { type TAsset } from 'entities/asset';
import { Button } from 'shared/ui';
import { type UseUploadFileOptions } from '../model/useUploadAvatar';
import { type ComponentProps } from 'react';
import { useAvatarFileInput } from '../model/useAvatarFileInput';

interface UploadAvatarButtonProps extends ComponentProps<typeof Button> {
  className?: string;
  context: TAsset.UploadAssetData['context'];
  mutationOptions?: UseUploadFileOptions;
}
function UploadAvatarButton({
  context,
  mutationOptions,
  children,
  asChild = false,
  variant = 'default',
  size = 'lg',
}: UploadAvatarButtonProps) {
  const { handleAvatarChange, handleAvatarPick, isPending, fileInputRef } = useAvatarFileInput(
    context,
    mutationOptions
  );
  return (
    <>
      <Button
        onClick={handleAvatarPick}
        asChild={asChild}
        variant={variant}
        size={size}
        disabled={isPending}
        aria-label="Загрузить новый аватар"
      >
        {children}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleAvatarChange}
      />
    </>
  );
}

export { UploadAvatarButton };
