import { CardSection, Skeleton } from 'shared/ui';

export function InviteSecuritySkeleton() {
  return (
    <CardSection
      className="space-y-4"
      title="Безопасность приглашений"
      description="Настройте поведение приглашений."
    >
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="input-max-w h-9 w-full" />
      </div>
      <div className="border-border flex items-center justify-between rounded-lg border px-4 py-3">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-3 w-80" />
        </div>
        <Skeleton className="h-6 w-10 shrink-0 rounded-full" />
      </div>
    </CardSection>
  );
}
