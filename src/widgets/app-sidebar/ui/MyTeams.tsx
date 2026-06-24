'use client';
import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';
import { Network } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from 'shared/config';
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from 'shared/ui';

export function MyTeams() {
  const pathname = usePathname();
  const invitationsQuery = useQuery(UserQueries.getMyInvitations());
  const invitationsCount = invitationsQuery.data?.items.length ?? 0;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip="Мои команды" isActive={pathname === routes.user.teams()} asChild>
        <Link href={routes.user.teams()}>
          <Network />
          <span>Мои команды</span>
        </Link>
      </SidebarMenuButton>
      {invitationsCount > 0 ? <SidebarMenuBadge>{`+${invitationsCount}`}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  );
}
