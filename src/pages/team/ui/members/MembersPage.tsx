'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Filter, Plus, SlidersHorizontal } from 'lucide-react';
import { MemberCardSkeleton } from './MemberCard.skeleton';
import { MemberCard } from './MemberCard';
import { InviteModal } from '../invites/InviteModal';
import { Button, Search } from 'shared/ui';
import { debounce } from 'shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { TeamQueries, TTeam, useTeamStore } from 'entities/team';

export function MembersPage() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const slug = useTeamStore.use.slug();
  const { data, isPending } = useQuery(TeamQueries.getMembers(slug!));
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
      setMembers(searchValue.current, data);
    }
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchValue.current = value;

    setSearch(value);

    if (data) {
      onFilter.debouncedCallback(value, data);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Search value={search} onChange={onChange} placeholder="Поиск участников…" />
        <Button onClick={() => setOpen(true)}>
          <Plus size={15} /> Пригласить
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          Показано <span className="font-medium">{filtered.length}</span> из {data?.length ?? 0}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter size={12} /> Фильтр
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal size={12} /> Сортировка
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => <MemberCardSkeleton key={i} />)
          : filtered.map((m) => <MemberCard key={m.id} member={m} />)}
      </div>

      <InviteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
