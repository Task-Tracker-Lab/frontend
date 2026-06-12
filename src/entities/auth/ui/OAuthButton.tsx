import { ButtonHTMLAttributes } from 'react';
import { Button } from 'shared/ui'; // или откуда у тебя берется базовый Button
import { cn } from 'shared/lib/utils';
import { OAUTH_PROVIDERS } from '../model/const';
import type * as TAuth from '../model/types';

type OAuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: TAuth.OAuthProvider;
  iconClassName?: string;
};

export function OAuthButton({ provider, className, iconClassName, ...props }: OAuthButtonProps) {
  const meta = OAUTH_PROVIDERS[provider];

  if (!meta) return null;

  const Icon = meta.icon;

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(meta.buttonClassName, className)}
      {...props}
    >
      <Icon className={cn('size-6', iconClassName)} />
    </Button>
  );
}
