import { UserRoundIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui';

interface UserAvatarProps extends ComponentProps<typeof AvatarImage> {
  wrap?: Omit<ComponentProps<typeof Avatar>, 'children'>;
  fallback?: Omit<ComponentProps<typeof AvatarFallback>, 'children'>;
}

export function UserAvatar({ wrap = {}, fallback = {}, ...props }: UserAvatarProps) {
  return (
    <Avatar {...wrap}>
      <AvatarImage alt="Аватар пользователя" {...props} />
      <AvatarFallback {...fallback}>
        {!fallback.firstName && !fallback.lastName ? <UserRoundIcon /> : null}
      </AvatarFallback>
    </Avatar>
  );
}
