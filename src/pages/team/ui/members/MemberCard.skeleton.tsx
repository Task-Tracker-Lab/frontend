import { Skeleton } from 'shared/ui';

export function MemberCardSkeleton() {
  return (
    <div className="bg-card border-border rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="mt-4 flex w-full flex-wrap items-end justify-between gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="mt-3 h-1.5 w-full" />
    </div>
  );
}
