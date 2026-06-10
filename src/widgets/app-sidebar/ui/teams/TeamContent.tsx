'use client';

import { InviteTeamMemberDialog } from 'features/teams/invite';
import { ChevronRight, Plus, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from 'shared/config';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from 'shared/ui';
import { team } from '../../config/sidebar';

export function TeamContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, isMobile } = useSidebar();

  const isAllowedToHighlight = !open && !isMobile;

  const handleClickTrigger = () => {
    if (isAllowedToHighlight) {
      router.push(routes.team.members());
    }
  };

  return (
    <Collapsible asChild className="group/collapsible" defaultOpen>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={handleClickTrigger}
            isActive={isAllowedToHighlight && pathname?.startsWith(routes.team.root())}
            tooltip="Управление командой"
          >
            <UsersRound />
            Команда
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content">
          <SidebarMenuSub>
            {team.map((subItem) => (
              <SidebarMenuSubItem key={subItem.url}>
                <SidebarMenuSubButton isActive={pathname?.startsWith(subItem.url)} asChild>
                  <Link href={subItem.url}>
                    <subItem.icon />
                    {subItem.title}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <InviteTeamMemberDialog className="w-full">
                  <Plus /> Добавить участника
                </InviteTeamMemberDialog>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
