import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { useSwitchTeam } from 'features/teams/active-team';
import { useMemo, useState } from 'react';
import { MAX_VISIBLE_TEAMS } from './const';
import { useTeamHotkeys } from './useTeamHotkeys';

export function useTeamsDropdown() {
  const [open, setOpen] = useState(false);

  const query = useQuery(UserQueries.getMyTeams());
  const teams = useMemo(() => query.data?.items ?? [], [query.data]);

  const { switchTeam } = useSwitchTeam({ teams });

  const visibleTeams = teams.slice(0, MAX_VISIBLE_TEAMS);
  const hasMoreTeams = teams.length > MAX_VISIBLE_TEAMS;

  useTeamHotkeys(visibleTeams, switchTeam);

  return {
    open,
    setOpen,
    query,
    visibleTeams,
    teams,
    hasMoreTeams,
    switchTeam,
  };
}
