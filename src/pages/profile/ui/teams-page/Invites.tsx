import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { InviteItem } from './InviteItem';
import { InviteItemSkeleton } from './skeletons/InviteItem.skeleton';

export function Invites() {
  const invitesQuery = useQuery(UserQueries.getMyInvites());

  if (invitesQuery.isPending) {
    return (
      <div className="space-y-6">
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <li key={i}>
              <InviteItemSkeleton variant="outline" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (invitesQuery.isError) {
    return (
      <p className="text-destructive text-sm" role="alert">
        {invitesQuery.error.message}
      </p>
    );
  }

  const invites = invitesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <ul className="flex flex-col gap-3">
        {
          invites.length === 0 ? (
            <p className="text-muted-foreground text-sm">Входящих приглашений нет.</p>
          ) : (
            invites.map((inv) => {
              return (
                <li key={inv.code}>
                  <InviteItem {...inv} />
                </li>
              );
            })
          )
        }
      </ul>
    </div>
  );
}
