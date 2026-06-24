'use client';

import { useQueryInvitations } from '../../api/useQueryInvitations';
import { InvitationCard } from './InvitationCard';
import { InvitationCardSkeleton } from './InvitationCard.skeleton';
import { InvitationsEmpty } from './InvitationsEmpty';

export function InvitationsPage() {
  const { data, isPending } = useQueryInvitations();

  if (!isPending && !data?.length) {
    return <InvitationsEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {isPending
        ? Array.from({ length: 6 }).map((_, i) => <InvitationCardSkeleton key={i} />)
        : data?.map((inv) => <InvitationCard key={inv.code} inv={inv} />)}
    </div>
  );
}
