'use client';

import { UploadAvatar } from 'features/upload-avatar';
import { TeamAvatar, type TTeam } from 'entities/team';
import { CardSection, Separator } from 'shared/ui';
import { TeamCover } from './TeamCover';
import { TeamIdentityForm } from './TeamIdentityForm';
import { formatDate } from 'shared/lib/utils';
import { ComponentProps } from 'react';
import { useAbility } from 'features/ability';

interface TeamIdentityProps extends Omit<
  ComponentProps<typeof CardSection>,
  'children' | 'title' | 'description'
> {
  team: TTeam.TeamDetailsResponse;
}

export function TeamIdentity({ team, ...props }: TeamIdentityProps) {
  const ability = useAbility('Team');

  const canUpdate = ability.can('update', 'TeamSettings');

  return (
    <CardSection
      {...props}
      title="Идентификация рабочего пространства"
      description="Публичная информация о команде."
    >
      <div className="space-y-5">
        <TeamCover canUpdate={canUpdate} coverUrl={team.cover?.medium ?? ''} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr]">
          <UploadAvatar
            context="team.avatar"
            avatar={
              <TeamAvatar
                wrap={{ className: 'ring-background size-28 shadow-md ring-4' }}
                src={team.avatar?.medium ?? undefined}
                alt={team.name}
              />
            }
          />
          <TeamIdentityForm canUpdate={canUpdate} />
        </div>

        <Separator />

        <p className="text-muted-foreground text-xs">
          Команда создана: <span className="text-foreground">{formatDate(team.createdAt)}</span>
        </p>
      </div>
    </CardSection>
  );
}
