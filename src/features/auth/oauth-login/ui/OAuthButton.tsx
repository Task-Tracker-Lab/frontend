import type { ButtonHTMLAttributes } from 'react';
import { Button } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { CAuth } from 'entities/auth';
import type { TAuth } from 'entities/auth';
import Link from 'next/link';
import { type Route } from 'next';
import Image from 'next/image';

type OAuthButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  provider: TAuth.OAuthProvider;
  iconClassName?: string;
  href: Route;
};

export function OAuthButton({
  provider,
  className,
  iconClassName,
  href,
  ...props
}: OAuthButtonProps) {
  const meta = CAuth.OAUTH_PROVIDERS[provider];
  if (!meta) return null;

  return (
    <Button
      type="button"
      size={meta.iconSrc ? 'icon' : 'default'}
      variant={'outline'}
      className={cn(meta.buttonClassName, className)}
      {...props}
    >
      <Link href={href} className="text-base">
        {meta.iconSrc ? (
          <Image
            src={meta.iconSrc}
            alt={meta.label}
            width={24}
            height={24}
            className={cn('size-6', iconClassName)}
          />
        ) : (
          meta.label
        )}
      </Link>
    </Button>
  );
}
