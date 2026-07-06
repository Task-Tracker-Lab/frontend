import { Separator, Skeleton } from 'shared/ui';

export function TaskFallback() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <div className="overflow-hidden rounded-lg border">
            <Skeleton className="h-16 w-full rounded-none" />
            <Skeleton className="h-16 w-full rounded-none" />
            <Skeleton className="h-16 w-full rounded-none" />
            <Skeleton className="h-16 w-full rounded-none" />
          </div>
        </div>
      </div>

      <Separator />
      <div className="flex gap-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-36" />
      </div>
    </div>
  );
}
