import { useQuery } from '@tanstack/react-query';
import { ProjectQueries } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { useParams } from 'next/navigation';

export function useQueryProject() {
  const teamId = useTeamStore.use.teamId();
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  return useQuery({
    ...ProjectQueries.getProject(teamId!, slug!),
    enabled: Boolean(teamId && slug),
  });
}
