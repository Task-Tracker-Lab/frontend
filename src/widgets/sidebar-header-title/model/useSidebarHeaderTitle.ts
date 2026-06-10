'use client';

import { usePathname } from 'next/navigation';
import { routeDefinitions } from '../config/route-definitions';

export function useSidebarHeaderTitle() {
  const pathname = usePathname() ?? '';
  const matchedRoute = routeDefinitions.find(([, matcher]) => matcher(pathname));

  return matchedRoute?.[2] ?? 'Task Tracker';
}
