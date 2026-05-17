import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { InvitationItem } from './InvitationItem';
import { InvitationItemSkeleton } from './skeletons/InvitationItem.skeleton';

export function Invitations() {
  const invitationsQuery = useQuery(UserQueries.getMyInvitations());

  if (invitationsQuery.isPending) {
    return (
      <div className="space-y-6">
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <li key={i}>
              <InvitationItemSkeleton variant="outline" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (invitationsQuery.isError) {
    return (
      <p className="text-destructive text-sm" role="alert">
        {invitationsQuery.error.message}
      </p>
    );
  }

  const invitations = invitationsQuery.data ?? [];

  return (
    <div className="space-y-6">
      <ul className="flex flex-col gap-3">
        {invitations.length === 0 ? (
          <p className="text-muted-foreground text-sm">Входящих приглашений нет.</p>
        ) : (
          invitations.map((inv) => {
            return (
              <li key={inv.code}>
                <InvitationItem {...inv} />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
