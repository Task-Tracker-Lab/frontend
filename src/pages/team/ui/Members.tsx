'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Filter, Plus, SlidersHorizontal } from 'lucide-react';
import { MemberCardSkeleton } from './components/MemberCard.skeleton';
import { MemberCard } from './components/MemberCard';
import { InviteModal } from './components/InviteModal';
import { members } from '../model/mock';
import { Button, Search } from 'shared/ui';
import { debounce } from 'shared/lib/utils';
import { UserHttp } from 'entities/user';

export function Members() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(members);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  UserHttp.getMyInvites; //todo временно для fsd

  const onFilter = useMemo(
    () =>
      debounce((value: string) => {
        setFiltered(
          members.filter(
            (m) =>
              m.fullName.toLowerCase().includes(value.trim().toLowerCase()) ||
              m.role.toLowerCase().includes(value.trim().toLowerCase())
          )
        );
      }, 300),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    onFilter.debouncedCallback(value);
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
          Показано <span className="font-medium">{filtered.length}</span> из {members.length}
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
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MemberCardSkeleton key={i} />)
          : filtered.map((m) => <MemberCard key={m.id} member={m} />)}
      </div>

      <InviteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
