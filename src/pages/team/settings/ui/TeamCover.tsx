import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useRef } from 'react';
import { Button } from 'shared/ui';
import { useUploadCover, type UseUploadFileOptions } from '../api/useUploadCover';

interface TeamCoverProps {
  mutationOptions?: UseUploadFileOptions;
  coverUrl: string;
}

export function TeamCover({ mutationOptions, coverUrl }: TeamCoverProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadCoverMutation = useUploadCover(mutationOptions);

  const handleCoverPick = () => {
    fileInputRef.current?.click();
  };

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    uploadCoverMutation.mutate({ file, context: 'team.banner' });
    event.target.value = '';
  };

  return (
    <div className="border-border relative overflow-hidden rounded-lg border">
      <div className="relative h-28 w-full">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div
            aria-hidden
            className="from-primary/25 via-primary/10 to-muted absolute inset-0 bg-linear-to-r"
          />
        )}
      </div>
      <div className="absolute inset-0 flex items-end justify-end p-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shadow-sm backdrop-blur-sm"
          onClick={handleCoverPick}
          disabled={uploadCoverMutation.isPending}
          aria-label="Загрузить обложку команды"
        >
          <ImagePlus />
          Сменить обложку
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleCoverChange}
      />
    </div>
  );
}
