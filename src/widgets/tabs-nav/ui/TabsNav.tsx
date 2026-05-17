'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { Badge } from 'shared/ui';
import { TabNavItem } from '../model/types';

interface TabsNavProps extends Omit<ComponentProps<'div'>, 'children'> {
  tabs: TabNavItem[];
}

export function TabsNav({ className, tabs, ...props }: TabsNavProps) {
  const pathname = usePathname();

  if (tabs.length === 0) {
    return null;
  }

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
              'relative space-x-1 p-3 text-sm font-medium whitespace-nowrap transition-colors duration-200',
              {},
              [active ? 'hover:cursor-default' : 'hover:text-muted-foreground']
            )}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <Badge className="relative -translate-y-1/2 p-1.5" variant={tab.badge.variant}>
                {tab.badge.value}
              </Badge>
            )}
            {active && <span className="bg-primary absolute inset-x-0 -bottom-px h-0.5" />}
          </Link>
        );
      })}
    </div>
  );
}
