import { useSuspenseQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';

export function useQueryTeam() {
  const teamId = useTeamStore.use.teamId() ?? '';

  return useSuspenseQuery(TeamQueries.getTeam(teamId));
}
