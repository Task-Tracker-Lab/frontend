'use client';

import { Filter, Plus, SlidersHorizontal } from 'lucide-react';
import { InviteTeamMemberDialog } from 'features/teams/invite';
import { Button, Search } from 'shared/ui';
import { MemberCard } from './MemberCard';
import { MemberCardSkeleton } from './MemberCard.skeleton';
import { useMembersPage } from '../../model/useMembersPage';
import { UserQueries } from 'entities/user';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { teamSubject, defineTeamMemberAbility } from 'entities/team';

export function MembersPage() {
  const { search, onChange, filtered, total, isPending } = useMembersPage();
  const user = useQuery(UserQueries.getMe());
  const teamRole = filtered.find((v) => v.id === user.data?.id)?.role;

  const ability = useMemo(
    () => defineTeamMemberAbility(user.data ? { id: user.data.id } : null, teamRole ?? null),
    [user.data, teamRole]
  );

  const canInvite = ability.can('invite', 'TeamMember');

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Search value={search} onChange={onChange} placeholder="Поиск участников…" />
        {canInvite && (
          <InviteTeamMemberDialog asChild>
            <Button>
              <Plus size={15} /> Пригласить
            </Button>
          </InviteTeamMemberDialog>
        )}
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
          : filtered.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                permissions={{
                  canChangeRole: ability.can('changeRole', teamSubject(m)),
                  canChangeStatus: ability.can('changeStatus', teamSubject(m)),
                  canDelete: ability.can('delete', teamSubject(m)),
                }}
              />
            ))}
      </div>
    </>
  );
}
