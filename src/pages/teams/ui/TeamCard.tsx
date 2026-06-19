'use client';

import { TeamAvatar, useTeamStore } from 'entities/team';
import { type TUser } from 'entities/user';
import { Crown } from 'lucide-react';
import { classNames } from 'shared/lib/utils';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from 'shared/ui';
import { TeamCardActions } from './TeamCardActions';

interface TeamCardProps {
  team: TUser.UserTeamResponse;
  onSelect?: (team: TUser.UserTeamResponse) => void;
}

export function TeamCard({ team, onSelect }: TeamCardProps) {
  const currentTeamSlug = useTeamStore.use.teamId();
  const isCurrentTeam = currentTeamSlug === team.id;

  return (
    <Item
      variant="outline"
      aria-current={isCurrentTeam ? 'true' : undefined}
      className={classNames('flex-nowrap', {
        'cursor-pointer': !isCurrentTeam,
        'border-primary bg-primary/5 ring-primary/20 ring-1': isCurrentTeam,
      })}
      onClick={() => {
        if (!isCurrentTeam) {
          onSelect?.(team);
        }
      }}
    >
      <ItemMedia>
        <div className="relative w-fit">
          <TeamAvatar src={team.avatar?.small} wrap={{ className: 'size-10' }} />
          {team.permissions.isOwner ? (
            <span
              className="bg-background ring-background absolute -top-0.5 -right-0.5 z-10 flex size-4 items-center justify-center rounded-full ring-2"
              aria-label="Владелец"
            >
              <Crown className="size-3 text-amber-500" />
            </span>
          ) : null}
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{team.name}</ItemTitle>
        <ItemDescription className="line-clamp-2">{team.description}</ItemDescription>
      </ItemContent>
      <ItemActions className="self-start">
        <TeamCardActions team={team} />
      </ItemActions>
    </Item>
  );
}
