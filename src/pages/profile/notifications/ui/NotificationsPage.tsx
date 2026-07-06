'use client';

import dynamic from 'next/dynamic';
import { NotificationsPageFallback } from './NotificationsPageFallback';

const NotificationsPageContent = dynamic(
  () => import('./NotificationsPageContent').then((mod) => mod.NotificationsPageContent),
  {
    ssr: false,
    loading: () => <NotificationsPageFallback />,
  }
);

function NotificationsPage() {
  return <NotificationsPageContent />;
}

export { NotificationsPage };
