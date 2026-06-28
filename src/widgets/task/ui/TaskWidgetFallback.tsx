import { Separator, Skeleton } from 'shared/ui';

export function TaskWidgetFallback() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-7 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Separator />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-5 w-2/5" />
    </div>
  );
}
