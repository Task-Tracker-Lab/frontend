'use client';
import { Network } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from 'shared/config';
import { SidebarMenuButton, SidebarMenuItem } from 'shared/ui';

export function MyTeams() {
  const pathname = usePathname();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={pathname === routes.profile.teams()} asChild>
        <Link href={routes.profile.teams()}>
          <Network />
          <span>Мои команды</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
