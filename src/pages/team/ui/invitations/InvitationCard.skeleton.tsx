import { Skeleton } from 'shared/ui';

export function InvitationCardSkeleton() {
  return (
    <div className="bg-primary/2 rounded-xl border border-dashed p-3">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-40" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Skeleton className="h-7 w-36 rounded-md" />
        <Skeleton className="h-7 w-36 rounded-md" />
      </div>
    </div>
  );
}
