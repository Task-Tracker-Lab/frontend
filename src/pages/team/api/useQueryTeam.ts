import { useQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';

export function useQueryTeam() {
  const teamId = useTeamStore.use.teamId();

  return useQuery({
    ...TeamQueries.getTeam(teamId!),
    enabled: Boolean(teamId),
  });
}
