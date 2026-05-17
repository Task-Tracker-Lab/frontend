import { useQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';

export function useQueryTeam() {
  const slug = useTeamStore.use.slug();

  return useQuery({
    ...TeamQueries.getTeam(slug!),
    enabled: Boolean(slug),
  });
}
