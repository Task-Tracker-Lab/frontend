import { UploadAvatar } from 'features/upload-avatar';

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
  return (
    <UploadAvatar
      avatar={avatar}
      alt={fullName}
      context="user.avatar"
      fallback={{
        firstName,
        lastName,
      }}
    />
  );
}

export { ProfileAvatarSection };
