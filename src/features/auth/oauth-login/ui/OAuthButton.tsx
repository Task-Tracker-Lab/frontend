import type { ButtonHTMLAttributes } from 'react';
import { Button, buttonVariants } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { CAuth } from 'entities/auth';
import type { TAuth } from 'entities/auth';
import { type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { type Route } from 'next';

type OAuthButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  VariantProps<typeof buttonVariants> & {
    provider: TAuth.OAuthProvider;
    iconClassName?: string;
    href: Route;
  };

export function OAuthButton({
  provider,
  className,
  iconClassName,
  size = 'icon',
  variant = 'outline',
  href,
  ...props
}: OAuthButtonProps) {
  const meta = CAuth.OAUTH_PROVIDERS[provider];

  if (!meta) return null;

  const Icon = meta.icon;

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={cn(meta.buttonClassName, className)}
      {...props}
    >
      <Link href={href}>
        <Icon className={cn('size-6', iconClassName)} />
      </Link>
    </Button>
  );
}
