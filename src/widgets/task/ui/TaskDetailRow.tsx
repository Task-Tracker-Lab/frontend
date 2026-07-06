import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from 'shared/lib/utils';

interface TaskDetailRowProps {
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function TaskDetailRow({ label, icon: Icon, children, className }: TaskDetailRowProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 px-4 py-3', className)}>
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="text-muted-foreground size-3.5 shrink-0" aria-hidden /> : null}
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
