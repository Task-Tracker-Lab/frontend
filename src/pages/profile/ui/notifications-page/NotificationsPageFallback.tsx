import { CardSection, Skeleton } from 'shared/ui';

export function NotificationsPageFallback() {
  return (
    <CardSection
      title="Уведомления"
      description="Настройки почтовых и push-уведомлений."
      className="space-y-5"
    >
      <OptionGroupSkeleton />
    </CardSection>
  );
}

function OptionGroupSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-16" />

      <div className="divide-muted-foreground/20 border-muted-foreground/20 !divide-y rounded-lg border">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-none px-4 py-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5.5 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
