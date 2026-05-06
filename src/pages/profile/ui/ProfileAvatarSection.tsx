import { Pencil } from 'lucide-react';
import { type ChangeEvent, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Button } from 'shared/ui';
import { useUpdateAvatar } from '../model/useUpdateAvatar';

interface ProfileAvatarSectionProps {
  avatar: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
}

function ProfileAvatarSection({
  avatar,
  fullName,
  firstName,
  lastName,
}: ProfileAvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatarMutation = useUpdateAvatar();

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
        <AvatarImage src={avatar ?? undefined} alt={fullName} />
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
