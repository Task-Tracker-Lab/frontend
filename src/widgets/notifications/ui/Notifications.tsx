'use client';

import dynamic from 'next/dynamic';
import { NotificationsFallback } from './NotificationsFallback';

const NotificationsContent = dynamic(
  () => import('./NotificationsContent').then((mod) => mod.NotificationsContent),
  { ssr: false, loading: () => <NotificationsFallback /> }
);

export function Notifications() {
  return <NotificationsContent />;
}
