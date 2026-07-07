'use client';

import { InviteTeamMemberDialog } from 'features/teams/invite';
import { Plus } from 'lucide-react';
import { Button, Search } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { useMembersPage } from '../model/useMembersPage';
import { MemberCard } from './MemberCard';

export function MembersPageContent() {
  const { search, onChange, filtered, total } = useMembersPage();

  return (
    <PageWrapper
      title="Участники команды"
      description={
        <>
          Показано <span className="font-medium">{filtered.length}</span> из {total}
        </>
      }
      action={
        <InviteTeamMemberDialog asChild>
          <Button variant="secondary">
            <Plus size={15} /> Пригласить
          </Button>
        </InviteTeamMemberDialog>
      }
    >
      <div className="mb-6">
        <Search value={search} onChange={onChange} placeholder="Поиск участников…" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </PageWrapper>
  );
}
