import { Skeleton } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { InvitationCardSkeleton } from './InvitationCard.skeleton';

export function InvitationsPageFallback() {
  return (
    <PageWrapper
      title="Входящие приглашения"
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      description={<Skeleton className="h-4 w-48" aria-hidden />}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <InvitationCardSkeleton variant="outline" key={index} />
      ))}
    </PageWrapper>
  );
}
