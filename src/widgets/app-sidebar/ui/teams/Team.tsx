'use client';

import dynamic from 'next/dynamic';
import { TeamFallback } from './TeamFallback';

const TeamContent = dynamic(() => import('./TeamContent').then((mod) => mod.TeamContent), {
  ssr: false,
  loading: () => <TeamFallback />,
});

export function Team() {
  return <TeamContent />;
}
