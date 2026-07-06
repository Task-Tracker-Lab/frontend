'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { MailOpen } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { getInvitationsCountText } from '../lib/get-invitations-count-text';
import { InvitationCard } from './InvitationCard';

export function InvitationsPageContent() {
  const invitationsQuery = useSuspenseQuery(UserQueries.getMyInvitations());
  const invitations = invitationsQuery.data;
  const invitationsCount = invitationsQuery.data.length ?? 0;

  return (
    <PageWrapper
      title="Входящие приглашения"
      className={
        invitations.length === 0
          ? undefined
          : 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }
      description={
        invitationsCount > 0 ? `У вас ${getInvitationsCountText(invitationsCount)}` : undefined
      }
    >
      {invitations.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MailOpen />
            </EmptyMedia>
            <EmptyTitle>Входящих приглашений нет</EmptyTitle>
            <EmptyDescription>Когда вас пригласят в команду, они появятся здесь.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        invitations.map((invitation) => (
          <InvitationCard key={invitation.code} invitation={invitation} />
        ))
      )}
    </PageWrapper>
  );
}
