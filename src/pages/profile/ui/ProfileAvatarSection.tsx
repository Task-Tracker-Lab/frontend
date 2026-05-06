import { Pencil } from 'lucide-react';
import { type ChangeEvent, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Button } from 'shared/ui';
import { toast } from 'sonner';
import { useUpdateAvatar } from '../model/useUpdateAvatar';

interface ProfileAvatarSectionProps {
  avatarUrl: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  onUploaded: () => Promise<void>;
}

function ProfileAvatarSection({
  avatarUrl,
  fullName,
  firstName,
  lastName,
  onUploaded,
}: ProfileAvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatarMutation = useUpdateAvatar({
    onSuccess: async () => {
      toast.success('Аватар обновлён');
      await onUploaded();
    },
  });

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    uploadAvatarMutation.mutate(file);
    event.target.value = '';
  };

  return (
    <div className="relative">
      <Avatar className="ring-background size-28 shadow-md ring-4">
        <AvatarImage src={avatarUrl ?? undefined} alt={fullName} />
        <AvatarFallback firstName={firstName} lastName={lastName} />
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

export { ProfileAvatarSection };
