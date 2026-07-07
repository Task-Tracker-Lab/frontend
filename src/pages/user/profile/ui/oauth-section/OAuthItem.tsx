'use client';

import { OAUTH_PROVIDERS, type TAuth } from 'entities/auth';
import Image from 'next/image';
import { useOAuthManage } from '../../model/useOAuthManage';
import { cn } from 'shared/lib/utils';
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Spinner,
} from 'shared/ui';
import { type OAuthConnectionStatus } from '../../model/profile';
import { OAuthStatusBadge } from './OAuthStatusBadge';

interface OAuthItemProps {
  provider: TAuth.OAuthProvider;
  label: string;
  status: OAuthConnectionStatus;
}

export function OAuthItem({ provider, label, status }: OAuthItemProps) {
  const { isPending, handleToggleConnect } = useOAuthManage(provider, status);
  const isConnected = status === 'connected';
  const meta = OAUTH_PROVIDERS[provider];

  return (
    <Item variant="outline" className="items-center">
      <ItemMedia>
        <Image
          className={cn('size-6 rounded-lg', meta.className)}
          src={meta.iconSrc}
          alt={provider}
          width={24}
          height={24}
          aria-hidden
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{label}</ItemTitle>
        <ItemDescription className="lg:hidden">
          <OAuthStatusBadge status={status} />
        </ItemDescription>
      </ItemContent>
      <ItemActions className="gap-3">
        <OAuthStatusBadge status={status} className="hidden lg:inline-flex" />
        <Button
          className="min-w-28"
          disabled={isPending}
          onClick={handleToggleConnect}
          variant={isConnected ? 'outline' : 'default'}
          size="sm"
        >
          {isPending && <Spinner />}
          <span>{isConnected ? 'Отключить' : 'Подключить'}</span>
        </Button>
      </ItemActions>
    </Item>
  );
}
