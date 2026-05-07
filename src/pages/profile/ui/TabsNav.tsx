'use client';

import { ComponentProps } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from 'shared/config';
import { classNames } from 'shared/lib/utils';

const tabs: { key: Route; label: string }[] = [
  { key: routes.profile.me(), label: 'Пользователь' },
  { key: routes.profile.security(), label: 'Безопасность' },
  { key: routes.profile.notifications(), label: 'Уведомления' },
];

export function TabsNav({ className, ...props }: ComponentProps<'div'>) {
  const pathname = usePathname();

  return (
    <div
      className={classNames(
        'border-border relative flex flex-wrap items-center gap-1 border-b',
        {},
        [className]
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.key;

        return (
          <Link
            key={tab.key}
            href={tab.key}
            className={classNames(
              'relative p-3 text-sm font-medium whitespace-nowrap transition-colors duration-200',
              {},
              [active ? 'hover:cursor-default' : 'hover:text-muted-foreground']
            )}
          >
            {tab.label}
            {active && <span className="bg-primary absolute inset-x-0 -bottom-px h-0.5" />}
          </Link>
        );
      })}
    </div>
  );
}
