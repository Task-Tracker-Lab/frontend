import { CardSection, Skeleton } from 'shared/ui';

export function ProfileSectionFallback() {
  return (
    <>
      <CardSection
        className="space-y-4"
        title="Идентификация профиля"
        description="Публичная информация о вас."
      >
        <div className="flex items-center justify-between gap-4 px-3 py-[10px]">
          <div className="flex items-center gap-6">
            <Skeleton className="size-20 rounded-full" aria-hidden />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" aria-hidden />
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-8" aria-hidden />
              <Skeleton className="h-9 w-full rounded-md" aria-hidden />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-14" aria-hidden />
              <Skeleton className="h-9 w-full rounded-md" aria-hidden />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-12" aria-hidden />
            <Skeleton className="h-[64px] w-full rounded-md" aria-hidden />
          </div>
        </div>
      </CardSection>
    </>
  );
}
