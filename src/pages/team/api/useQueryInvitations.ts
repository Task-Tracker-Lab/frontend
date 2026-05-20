import { useQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';

export function useQueryInvitations() {
  const slug = useTeamStore.use.slug();

  return useQuery({
    ...TeamQueries.getInvitations(slug!),
    enabled: Boolean(slug),
  });
}
