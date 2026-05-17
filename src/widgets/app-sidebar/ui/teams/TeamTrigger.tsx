import { TUser } from 'entities/user';
import { UseQueryResult } from '@tanstack/react-query';
import { TeamItem } from './TeamItem';
import { TeamItemSkeleton } from './TeamItem.skeleton';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';
import { useTeamStore } from 'entities/team';

interface TeamTriggerProps {
  query: UseQueryResult<TUser.UserTeamResponse[]>;
}

export function TeamTrigger({ query }: TeamTriggerProps) {
  const slug = useTeamStore.use.slug();

  const activeTeam = useMemo(() => {
    if (query.data) {
      return query.data.find((d) => d.slug === slug);
    }
  }, [slug, query.data]);

  if (query.isPending) {
    return <TeamItemSkeleton />;
  }

  if (query.isError) {
    return (
      <TeamItem name={query.error.name} description={query.error.message} variant="destructive" />
    );
  }

  if (!activeTeam) {
    return <TeamItem name="Выберите команду" action={<ChevronsUpDown />} />;
  }

  return (
    <TeamItem
      avatar={activeTeam.avatar}
      name={activeTeam.name}
      description={activeTeam.description}
      action={<ChevronsUpDown />}
    />
  );
}
