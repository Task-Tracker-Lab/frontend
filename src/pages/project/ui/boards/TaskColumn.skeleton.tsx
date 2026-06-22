import { Skeleton } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { ComponentProps } from 'react';

interface TaskColumnSkeletonProps extends ComponentProps<'div'> {
  taskCount?: number;
}

export function TaskColumnSkeleton({
  className,
  taskCount = 3,
  ...props
}: TaskColumnSkeletonProps) {
  return (
    <div className={cn('flex w-[250px] min-w-[250px] flex-col gap-2.5', className)} {...props}>
      <div className="dark:bg-card overflow-hidden rounded-lg bg-gray-100">
        <Skeleton className="h-1.5 w-full rounded-none" />
        <div className="flex h-8 items-center justify-between gap-2 px-2.5 py-1.5">
          <Skeleton className="h-4 w-28" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-7 rounded-md" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        </div>
      </div>

      <Skeleton className="h-9 w-full rounded-md" />

      {Array.from({ length: taskCount }).map((_, index) => (
        <div key={index} className="bg-background rounded-lg border p-3 shadow-xs">
          <div className="mb-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="size-6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
