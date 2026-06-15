import { useQuery } from '@tanstack/react-query';
import { TeamAvatar, useTeamStore } from 'entities/team';
import { UserQueries } from 'entities/user';
import { RemoveTeamDialog } from 'features/teams/remove';
import { Trash2Icon } from 'lucide-react';
import {
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';
import { useSwitchTeam } from 'features/teams/active-team';

export function TeamsList() {
  const teamsQuery = useQuery(UserQueries.getMyTeams());
  const teamId = useTeamStore.use.teamId();

  const { switchTeam } = useSwitchTeam({
    teams: teamsQuery.data,
    defaultOptions: { redirect: true },
  });

  if (teamsQuery.isError) {
    return (
      <p className="text-destructive text-sm" role="alert">
        {teamsQuery.error.message}
      </p>
    );
  }

  const teams = teamsQuery.data ?? [];

  return (
    <ul className="flex flex-col gap-2">
      {teams.map((team) => (
        <li key={team.id}>
          <Item className="relative" variant="outline">
            {team.permissions.isOwner ? (
              <Badge
                className="text-primary absolute bottom-0 left-0 p-2 text-xs"
                variant="outline"
              >
                Owner
              </Badge>
            ) : null}
            <ItemMedia>
              <TeamAvatar src={team.avatar?.small} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{team.name}</ItemTitle>
              <ItemDescription>{team.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <div className="flex items-center gap-1">
                <RemoveTeamDialog teamName={team.name} teamId={team.id} asChild>
                  <Button type="button" size="sm" variant="ghost">
                    <Trash2Icon className="text-destructive size-4" />
                  </Button>
                </RemoveTeamDialog>
                <Button
                  type="button"
                  size="sm"
                  variant="link"
                  onClick={() => switchTeam(team.id)}
                  disabled={teamId === team.id}
                >
                  {teamId === team.id ? 'Текущая' : 'Перейти'}
                </Button>
              </div>
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}
