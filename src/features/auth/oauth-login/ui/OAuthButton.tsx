import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'shared/ui';
import { cn } from 'shared/lib/utils';
import { OAUTH_PROVIDERS } from 'entities/auth';
import type { ButtonHTMLAttributes } from 'react';
import type { Route } from 'next';
import type { TAuth } from 'entities/auth';

type OAuthButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  iconClassName?: string;
  href: Route;
  data: {
    label: string;
    value: TAuth.OAuthProvider;
  };
};

export function OAuthButton({ className, iconClassName, href, data, ...props }: OAuthButtonProps) {
  const { label, value } = data;
  const meta = OAUTH_PROVIDERS[value];

  if (!meta) return null;

  return (
    <Button
      type="button"
      size={meta.iconSrc ? 'icon' : 'default'}
      variant={'outline'}
      className={cn(meta.buttonClassName, className)}
      {...props}
    >
      <a href={href} className="text-base">
        {meta.iconSrc ? (
          <Image
            src={meta.iconSrc}
            alt={label}
            width={24}
            height={24}
            className={cn('size-6', iconClassName)}
          />
        ) : (
          label
        )}
      </a>
    </Button>
  );
}
