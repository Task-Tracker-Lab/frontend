import { UsersIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui';

export function TeamAvatar(props: ComponentProps<typeof AvatarImage>) {
  return (
    <Avatar>
      <AvatarImage alt="Аватар команды" {...props} />
      <AvatarFallback>
        <UsersIcon />
      </AvatarFallback>
    </Avatar>
  );
}
