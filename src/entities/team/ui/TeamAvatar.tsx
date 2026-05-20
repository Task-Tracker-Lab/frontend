import { UsersIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui';

interface TeamAvatarProps extends ComponentProps<typeof AvatarImage> {
  wrap?: Omit<ComponentProps<typeof Avatar>, 'children'>;
  fallback?: Omit<ComponentProps<typeof AvatarFallback>, 'children'>;
}

export function TeamAvatar({ wrap = {}, fallback = {}, ...props }: TeamAvatarProps) {
  return (
    <Avatar {...wrap}>
      <AvatarImage alt="Аватар команды" {...props} />
      <AvatarFallback>
        {!fallback.firstName && !fallback.lastName ? <UsersIcon /> : null}
      </AvatarFallback>
    </Avatar>
  );
}
