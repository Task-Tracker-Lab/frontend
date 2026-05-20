import { CardSection, Skeleton } from 'shared/ui';

export function TeamIdentitySkeleton() {
  return (
    <CardSection
      title="Идентификация рабочего пространства"
      description="Публичная информация о команде."
    >
      <div className="space-y-5">
        <Skeleton className="h-28 w-full rounded-lg" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr]">
          <Skeleton className="mx-auto size-24 shrink-0 rounded-full sm:mx-0" />
          <div className="space-y-4">
            <Skeleton className="input-max-w h-9 w-full" />
            <Skeleton className="input-max-w h-9 w-full" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </CardSection>
  );
}
