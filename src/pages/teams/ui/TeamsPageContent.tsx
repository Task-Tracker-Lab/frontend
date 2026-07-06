'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { useSwitchTeam } from 'features/teams/active-team';
import { CreateTeamDialog } from 'features/teams/create';
import { Plus } from 'lucide-react';
import { Button } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { getTeamsCountText } from '../lib/get-teams-count-text';
import { TeamCard } from './TeamCard';

export function TeamsPageContent() {
  const teamsQuery = useSuspenseQuery(UserQueries.getMyTeams());
  const teams = teamsQuery.data;
  const teamsCount = teams.length;

  const { switchTeam } = useSwitchTeam({
    teams,
    defaultOptions: { redirect: false },
  });

  return (
    <PageWrapper
      title="Ваши команды"
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      description={`Вы учавствуете в ${getTeamsCountText(teamsCount)}`}
      action={
        <CreateTeamDialog asChild>
          <Button type="button" variant="secondary">
            <Plus className="size-4" />
            Новая команда
          </Button>
        </CreateTeamDialog>
      }
    >
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} onSelect={() => switchTeam(team.id)} />
      ))}
    </PageWrapper>
  );
}
