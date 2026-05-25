import { Skeleton } from 'shared/ui';

export function ProjectCardSkeleton() {
  return (
    <div className="bg-background border-border/50 flex h-full max-w-sm flex-col overflow-hidden rounded-xl border shadow-sm">
      <div className="bg-muted h-1 w-full" />
      <div className="relative px-4 pt-5 pb-2">
        <div className="flex items-start gap-4 pr-10">
          <Skeleton className="size-12 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2.5 pt-0.5">
            <Skeleton className="h-5 w-36" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
        <Skeleton className="absolute top-4 right-4 size-8 rounded-md" />
      </div>

      <div className="flex-1 px-4 pt-2 pb-4">
        <div className="mb-5 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </div>

      <div className="border-border/50 bg-muted/20 flex items-center justify-between border-t px-4 py-3">
        <div className="flex -space-x-2">
          <Skeleton className="border-background size-6 rounded-full border-2" />
          <Skeleton className="border-background size-6 rounded-full border-2" />
          <Skeleton className="border-background size-6 rounded-full border-2" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
