import { useQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';

export function useQueryInvitations() {
  const teamId = useTeamStore.use.teamId();

  return useQuery({
    ...TeamQueries.getInvitations(teamId!),
    enabled: Boolean(teamId),
  });
}
