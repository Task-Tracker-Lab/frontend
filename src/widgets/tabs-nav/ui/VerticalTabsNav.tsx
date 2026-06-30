'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { Badge, Button } from 'shared/ui';
import { TabNavItem } from '../model/types';

interface TabsNavProps extends Omit<ComponentProps<'div'>, 'children'> {
  tabs: TabNavItem[];
}

export function VerticalTabsNav({ className, tabs, ...props }: TabsNavProps) {
  const pathname = usePathname();

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames('relative flex flex-col flex-wrap gap-1', {}, [className])}
      {...props}
    >
      {tabs.map((tab) => {
        const active = tab.matchPrefix
          ? (pathname ?? '').startsWith(tab.key)
          : pathname === tab.key;

        return (
          <Button
            className={classNames('hover:text-primary relative w-full items-center justify-start', {
              'bg-muted dark:bg-muted/50 text-primary': active,
            })}
            asChild
            variant={'ghost'}
            key={tab.key}
          >
            <Link href={tab.key}>
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <Badge className="relative -translate-y-1/2 p-1.5" variant={tab.badge.variant}>
                  {tab.badge.value}
                </Badge>
              )}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
