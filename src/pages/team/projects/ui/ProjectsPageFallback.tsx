import { Skeleton } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';

export function ProjectsPageFallback() {
  return (
    <PageWrapper
      title="Проекты команды"
      className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3"
      description={<Skeleton className="h-4 w-56" aria-hidden />}
      action={<Skeleton className="h-9 w-40 rounded-md" aria-hidden />}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full rounded-lg" aria-hidden />
      ))}
    </PageWrapper>
  );
}
