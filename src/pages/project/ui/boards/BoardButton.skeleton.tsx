import { Skeleton, buttonVariants } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { ComponentProps } from 'react';

export function BoardButtonSkeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'outline', size: 'default' }),
        'gap-2 px-3',
        className
      )}
      {...props}
    >
      <Skeleton className="h-4 w-24" />
      <Skeleton className="size-4 rounded-sm" />
    </div>
  );
}
