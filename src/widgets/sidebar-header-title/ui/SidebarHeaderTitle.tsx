'use client';

import { classNames } from 'shared/lib/utils';
import { useSidebarHeaderTitle } from '../model/useSidebarHeaderTitle';

export function SidebarHeaderTitle({
  className,
  ...props
}: Omit<React.ComponentProps<'p'>, 'children'>) {
  const resolvedTitle = useSidebarHeaderTitle();

  return (
    <p
      className={classNames('text-foreground truncate text-base leading-none font-semibold', {}, [
        className,
      ])}
      {...props}
    >
      {resolvedTitle}
    </p>
  );
}
