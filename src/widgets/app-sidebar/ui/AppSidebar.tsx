'use client';

import { InviteTeamMemberDialog } from 'features/teams/invite';
import { ChevronRight, SquarePlusIcon, UserRound, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { routes } from 'shared/config';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from 'shared/ui';
import { NavUser } from './NavUser';
import { TeamsDropdown } from './teams/TeamsDropdown';

const team = [
  {
    url: routes.team.members(),
    title: 'Участники',
    action: (
      <InviteTeamMemberDialog asChild>
        <SquarePlusIcon />
      </InviteTeamMemberDialog>
    ),
  },
  { url: routes.team.invitations(), title: 'Приглашения', action: null },
  { url: routes.team.roles(), title: 'Роли', action: null },
  { url: routes.team.settings(), title: 'Настройки', action: null },
];

export function AppSidebar({ ...props }: Omit<React.ComponentProps<typeof Sidebar>, 'children'>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamsDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={routes.profile.root()}>
                  <UserRound />
                  <span>Мой профиль</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Collapsible asChild defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Управление командой">
                    <UsersRound />
                    <span>Команда</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {team.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                        {subItem.action ? (
                          <SidebarMenuAction>{subItem.action}</SidebarMenuAction>
                        ) : null}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
