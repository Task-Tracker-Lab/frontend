'use client';

import { useQuery } from '@tanstack/react-query';
import { TeamQueries, TTeam, useTeamStore } from 'entities/team';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'shared/lib/utils';

export function useMembersPage() {
  const slug = useTeamStore.use.slug();
  const { data, isPending } = useQuery(TeamQueries.getMembers(slug!));

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<TTeam.TeamMemberResponse[]>([]);
  const searchValue = useRef(search);

  const setMembers = (value: string, members: TTeam.TeamMemberResponse[]) => {
    setFiltered(
      members.filter(
        (m) =>
          m.fullName.toLowerCase().includes(value.trim().toLowerCase()) ||
          m.role.toLowerCase().includes(value.trim().toLowerCase())
      )
    );
  };

  const onFilter = useMemo(() => debounce(setMembers, 300), []);

  useEffect(() => {
    if (data) {
      setMembers(searchValue.current, data.items);
    }
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchValue.current = value;
    setSearch(value);

    if (data) {
      onFilter.debouncedCallback(value, data.items);
    }
  };

  return {
    search,
    onChange,
    filtered,
    total: data?.items?.length ?? 0,
    isPending,
  };
}
