'use client';

import dynamic from 'next/dynamic';
import { NavUserFallback } from './NavUserFallback';

const NavUserContent = dynamic(() => import('./NavUserContent').then((mod) => mod.NavUserContent), {
  ssr: false,
  loading: () => <NavUserFallback />,
});

export function NavUser() {
  return <NavUserContent />;
}
