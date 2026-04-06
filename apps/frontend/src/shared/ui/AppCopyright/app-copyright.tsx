import * as React from 'react';
import { cn } from 'shared/lib';

function AppCopyright({ className, ...props }: Omit<React.ComponentProps<'p'>, 'children'>) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props}>
      © {new Date().getFullYear()} TaskTracker Lab.
    </p>
  );
}

export { AppCopyright };
