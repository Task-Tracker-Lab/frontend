import { Skeleton } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { TeamCardSkeleton } from './TeamCard.skeleton';

export function TeamsPageFallback() {
  return (
    <PageWrapper
      title="Ваши команды"
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      description={<Skeleton className="h-4 w-48" aria-hidden />}
      action={<Skeleton className="h-9 w-36 rounded-md" aria-hidden />}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <TeamCardSkeleton variant="outline" key={index} />
      ))}
    </PageWrapper>
  );
}
