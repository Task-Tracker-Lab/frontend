import { useQuery } from '@tanstack/react-query';
import { TeamAvatar } from 'entities/team';
import { UserQueries } from 'entities/user';
import { RemoveTeamDialog } from 'features/teams/remove';
import { Trash2Icon } from 'lucide-react';
import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from 'shared/ui';
import { useNavigateToTeam } from '../../model/useNavigateToTeam';
import { TeamsEmpty } from './TeamsEmpty';
import { TeamItemSkeleton } from './skeletons/TeamItem.skeleton';

export function TeamsList() {
  const teamsQuery = useQuery(UserQueries.getMyTeams());
  const navigateToTeam = useNavigateToTeam();

  if (teamsQuery.isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TeamItemSkeleton variant="outline" key={i} />
        ))}
      </div>
    );
  }

  if (teamsQuery.isError) {
    return (
      <p className="text-destructive text-sm" role="alert">
        {teamsQuery.error.message}
      </p>
    );
  }

  const teams = teamsQuery.data ?? [];
  if (teams.length === 0) {
    return <TeamsEmpty />
  }

  return (
    <ul className="flex flex-col gap-2">
      {teams.map((team) => (
        <li key={team.id}>
          <Item variant="outline">
            <ItemMedia>
              <TeamAvatar src={team.avatar?.small} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{team.name}</ItemTitle>
              <ItemDescription>{team.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <div className="flex items-center gap-1">
                <RemoveTeamDialog teamName={team.name} slug={team.slug} asChild>
                  <Button type="button" size="sm" variant="ghost">
                    <Trash2Icon className="text-destructive size-4" />
                  </Button>
                </RemoveTeamDialog>
                <Button
                  type="button"
                  size="sm"
                  variant="link"
                  onClick={() => navigateToTeam(team.slug)}
                >
                  Перейти
                </Button>
              </div>
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}
