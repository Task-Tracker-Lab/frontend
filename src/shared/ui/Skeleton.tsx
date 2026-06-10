import { cn } from 'shared/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <span
      data-slot="skeleton"
      className={cn('bg-muted inline-block animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
