'use client';

import dynamic from 'next/dynamic';
import { SettingsPageFallback } from './SettingsPageFallback';

const SettingsPageContent = dynamic(
  () => import('./SettingsPageContent').then((mod) => mod.SettingsPageContent),
  {
    ssr: false,
    loading: () => <SettingsPageFallback />,
  }
);

export function SettingsPage() {
  return <SettingsPageContent />;
}
