import { TAsset } from 'entities/asset';
import { Pencil } from 'lucide-react';
import { type ChangeEvent, type ComponentProps, type ReactElement, useRef } from 'react';
import { classNames } from 'shared/lib/utils';
import { type Avatar, Button } from 'shared/ui';
import { useUploadAvatar, UseUploadFileOptions } from '../model/useUploadAvatar';

interface UploadAvatarProps {
  className?: string;
  avatar: ReactElement<ComponentProps<typeof Avatar>, typeof Avatar>;
  context: TAsset.UploadAssetData['context'];
  mutationOptions?: UseUploadFileOptions;
}

function UploadAvatar({ className, avatar, context, mutationOptions }: UploadAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatarMutation = useUploadAvatar(mutationOptions);

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    uploadAvatarMutation.mutate({ file, context });
    event.target.value = '';
  };

  return (
    <div className={classNames('relative h-min w-min', {}, [className])}>
      {avatar}
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        className="absolute right-0 bottom-0 rounded-full"
        onClick={handleAvatarPick}
        disabled={uploadAvatarMutation.isPending}
        aria-label="Загрузить новый аватар"
      >
        <Pencil />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleAvatarChange}
      />
    </div>
  );
}

export { UploadAvatar };
