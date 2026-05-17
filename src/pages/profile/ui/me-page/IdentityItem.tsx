'use client';

import { Item, ItemActions, ItemContent, ItemMedia } from 'shared/ui';
import { UploadAvatar } from 'features/upload-avatar';
import { SignOut } from 'features/auth/sign-out';
import { TUser, UserAvatar } from 'entities/user';

type AccountIdentityItemProps = {
  profile: TUser.UserResponse['profile'];
  email: string;
};

function IdentityItem({ profile, email }: AccountIdentityItemProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Item className="items-start gap-4">
      <ItemMedia>
        <UploadAvatar
          context="user.avatar"
          avatar={
            <UserAvatar
              wrap={{ className: 'ring-background size-28 shadow-md ring-4' }}
              src={profile.avatar?.medium}
              alt={fullName}
              fallback={{ firstName: profile.firstName, lastName: profile.lastName }}
            />
          }
        />
      </ItemMedia>
      <ItemContent className="self-center">
        <div className="space-y-1">
          <p className="text-xl font-semibold">{fullName}</p>
          <p className="text-muted-foreground text-sm sm:text-base">{email}</p>
          <p className="text-muted-foreground max-w-xl text-sm">
            {profile.bio?.trim() || 'Добавьте информацию о себе в профиле'}
          </p>
        </div>
      </ItemContent>
      <ItemActions>
        <SignOut className="self-start" />
      </ItemActions>
    </Item>
  );
}

export { IdentityItem };
