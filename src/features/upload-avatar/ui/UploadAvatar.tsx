import { Pencil } from 'lucide-react';
import { type ChangeEvent, ComponentProps, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Button } from 'shared/ui';
import { classNames } from 'shared/lib/utils';
import { useUploadAvatar, UseUploadFileOptions } from '../model/useUploadAvatar';
import { TFile } from 'entities/file';

interface UploadAvatarProps {
  className?: string;
  avatar: string | null;
  alt: string;
  fallback?: ComponentProps<typeof AvatarFallback>;
  context: TFile.UploadFileData['context'];
  mutationOptions?: UseUploadFileOptions;
}

function UploadAvatar({
  className,
  avatar,
  alt,
  context,
  fallback = {},
  mutationOptions,
}: UploadAvatarProps) {
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
    <div className={classNames('relative', {}, [className])}>
      <Avatar className="ring-background size-28 shadow-md ring-4">
        <AvatarImage src={avatar ?? undefined} alt={alt} />
        <AvatarFallback {...fallback} />
      </Avatar>
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
