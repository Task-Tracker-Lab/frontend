'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from 'shared/config';
import type { Route } from 'next';
import { Badge } from 'shared/ui';
import { classNames } from 'shared/lib/utils';
import { ComponentProps } from 'react';

//todo principle of a single source of truth
const tabs: { key: Route; label: string; badge?: number }[] = [
  { key: routes.team.members(), label: 'Участники', badge: 8 },
  { key: routes.team.invites(), label: 'Приглашения', badge: 3 },
  { key: routes.team.roles(), label: 'Роли и права' },
  { key: routes.team.settings(), label: 'Настройки' },
];

export function TabsNav({ className, ...props }: ComponentProps<'div'>) {
  const pathname = usePathname();

  return (
    <div
      className={classNames('border-border relative flex items-center gap-1 border-b', {}, [
        className,
      ])}
      {...props}
    >
      {tabs.map((t) => {
        const active = pathname === t.key;

        return (
          <Link
            key={t.key}
            href={t.key}
            className={classNames(
              'relative flex items-center gap-2 p-3 text-sm font-medium transition-colors duration-200',
              {},
              [active ? 'hover:cursor-default' : 'hover:text-muted-foreground']
            )}
          >
            {t.label}
            {t.badge !== undefined && <Badge variant="secondary">{t.badge}</Badge>}
            {active && <span className="bg-primary absolute inset-x-0 -bottom-px h-0.5" />}
          </Link>
        );
      })}
    </div>
  );
}
