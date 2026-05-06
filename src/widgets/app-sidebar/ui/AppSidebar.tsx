'use client';

import {
  AudioWaveform,
  ChevronRight,
  Command,
  GalleryVerticalEnd,
  UserRound,
  UsersRound,
} from 'lucide-react';
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from 'shared/ui';
import { TeamSwitcher } from './TeamSwitcher';
import { NavUser } from './NavUser';
import { routes } from 'shared/config';
import Link from 'next/link';

const data = {
  teams: [
    {
      name: 'Task Tracker Frontend',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Task Tracker Backend',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Task Tracker Devops',
      logo: Command,
      plan: 'Free',
    },
  ],
};

const team = [
  { url: routes.team.members(), title: 'Участники' },
  { url: routes.team.invites(), title: 'Приглашения' },
  { url: routes.team.roles(), title: 'Роли' },
  { url: routes.team.settings(), title: 'Настройки' },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={routes.profile()}>
                  <UserRound />
                  <span>Профиль</span>
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
