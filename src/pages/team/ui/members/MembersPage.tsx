'use client';

import { Filter, Plus, SlidersHorizontal } from 'lucide-react';
import { InviteTeamMemberDialog } from 'features/teams/invite';
import { Button, Search } from 'shared/ui';
import { MemberCard } from './MemberCard';
import { MemberCardSkeleton } from './MemberCard.skeleton';
import { useMembersPage } from '../../model/useMembersPage';

export function MembersPage() {
  const { search, onChange, filtered, total, isPending } = useMembersPage();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Search value={search} onChange={onChange} placeholder="Поиск участников…" />
        <InviteTeamMemberDialog asChild>
          <Button>
            <Plus size={15} /> Пригласить
          </Button>
        </InviteTeamMemberDialog>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          Показано <span className="font-medium">{filtered.length}</span> из {total}
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
    </>
  );
}
