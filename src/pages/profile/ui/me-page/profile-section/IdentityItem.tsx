'use client';

import { Item, ItemActions, ItemMedia } from 'shared/ui';
import { UploadAvatar } from 'features/upload-avatar';
import { SignOut } from 'features/auth/sign-out';
import { type TUser, UserAvatar } from 'entities/user';

type AccountIdentityItemProps = {
  profile: TUser.UserResponse['profile'];
};

function IdentityItem({ profile }: AccountIdentityItemProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Item className="items-center justify-between gap-4">
      <ItemMedia className="gap-6">
        <UploadAvatar
          context="user.avatar"
          avatar={
            <UserAvatar
              wrap={{ className: 'size-20 ' }}
              src={profile.avatar?.medium}
              alt={fullName}
              fallback={{ firstName: profile.firstName, lastName: profile.lastName }}
            />
          }
        />
      </ItemMedia>
      <ItemActions>
        <SignOut size={'lg'} variant={'destructive'} />
      </ItemActions>
    </Item>
  );
}

export { IdentityItem };
