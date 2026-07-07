'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { TeamQueries, useTeamStore } from 'entities/team';
import { InviteTeamMemberDialog } from 'features/teams/invite';
import { Plus } from 'lucide-react';
import { Button } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { getPendingMembersCountText } from '../lib/get-pending-members-count-text';
import { InvitationCard } from './InvitationCard';
import { InvitationsEmpty } from './InvitationsEmpty';

export function InvitationsPageContent() {
  const teamId = useTeamStore.use.teamId() ?? '';
  const { data } = useSuspenseQuery(TeamQueries.getInvitations(teamId));
  const invitations = data ?? [];
  const total = invitations.length;

  return (
    <PageWrapper
      title="Приглашения"
      description={`Команда ожидает ${getPendingMembersCountText(total)}`}
      action={
        <InviteTeamMemberDialog asChild>
          <Button variant="secondary">
            <Plus size={15} /> Пригласить
          </Button>
        </InviteTeamMemberDialog>
      }
    >
      {total === 0 ? (
        <InvitationsEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.code} invitation={invitation} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
