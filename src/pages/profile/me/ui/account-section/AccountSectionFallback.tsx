import { CardSection, Skeleton } from 'shared/ui';

export function AccountSectionFallback() {
  return (
    <CardSection
      className="flex flex-col"
      title="Связанные аккаунты"
      description="Управление привязкой к социальным сетям и сервисам"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="hover:bg-muted flex items-center justify-between gap-2 border-t p-2 transition-colors first:rounded-t-lg first:border-none last:rounded-b-lg"
        >
          <div className="flex shrink-0 items-center gap-3">
            <Skeleton className="size-6 rounded-lg" aria-hidden />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-28" aria-hidden />
              <Skeleton className="h-4 w-20 lg:hidden" aria-hidden />
            </div>
          </div>
          <div className="grid items-center gap-3 lg:w-full lg:max-w-[220px] lg:grid-cols-2">
            <Skeleton className="hidden h-5 w-full rounded-md lg:block" aria-hidden />
            <Skeleton className="h-9 min-w-[106px] rounded-md" aria-hidden />
          </div>
        </div>
      ))}
    </CardSection>
  );
}
