'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { Button } from 'shared/ui';
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
    <div className={classNames('bg-card w-min space-y-1', {}, [className])} {...props}>
      {tabs.map((tab) => {
        const active = tab.matchPrefix
          ? (pathname ?? '').startsWith(tab.key)
          : pathname === tab.key;

        return (
          <Button
            className="w-full justify-start"
            asChild
            variant={active ? 'secondary' : 'ghost'}
            key={tab.key}
          >
            <Link href={tab.key}>
              {tab.icon}
              <span className="hidden lg:inline">{tab.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
