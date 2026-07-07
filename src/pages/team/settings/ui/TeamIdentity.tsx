'use client';

import { TeamAvatar, type TTeam } from 'entities/team';
import { UploadAvatar } from 'features/upload-avatar';
import { ComponentProps } from 'react';
import { formatDate } from 'shared/lib/utils';
import { CardSection, Separator } from 'shared/ui';
import { TeamCover } from './TeamCover';
import { TeamIdentityForm } from './TeamIdentityForm';

interface TeamIdentityProps extends Omit<
  ComponentProps<typeof CardSection>,
  'children' | 'title' | 'description'
> {
  team: TTeam.TeamDetailsResponse;
}

export function TeamIdentity({ team, ...props }: TeamIdentityProps) {
  return (
    <CardSection
      {...props}
      title="Идентификация команды"
      description="Публичная информация о команде."
    >
      <div className="space-y-5">
        <TeamCover coverUrl={team.cover?.medium ?? ''} />

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
          <TeamIdentityForm />
        </div>

        <Separator />

        <p className="text-muted-foreground text-xs">
          Команда создана: <span className="text-foreground">{formatDate(team.createdAt)}</span>
        </p>
      </div>
    </CardSection>
  );
}
