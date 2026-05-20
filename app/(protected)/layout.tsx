import { SidebarLayout } from 'app/layouts/SidebarLayout';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { SIDEBAR_COOKIE_NAME } from 'shared/ui';

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const stored = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === 'true';
  const defaultSidebarOpen = stored ?? true;

  return <SidebarLayout defaultOpen={defaultSidebarOpen}>{children}</SidebarLayout>;
}
