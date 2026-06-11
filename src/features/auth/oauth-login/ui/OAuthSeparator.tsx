import { cn } from 'shared/lib/utils';

interface OAuthSeparatorProps {
  className?: string;
  label?: string;
}

export function OAuthSeparator({ className, label = 'или' }: OAuthSeparatorProps) {
  return (
    <div className={cn('text-muted-foreground my-3 flex items-center', className)}>
      <span className="bg-border h-px w-full" />
      <span className="block px-2">{label}</span>
      <span className="bg-border h-px w-full" />
    </div>
  );
}
