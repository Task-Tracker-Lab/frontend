'use client';

import {
  AudioWaveform,
  Command,
  FolderKanban,
  GalleryVerticalEnd,
  ListTodo,
  UserRound,
} from 'lucide-react';
import {
  Link,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from 'shared/ui';
import { TeamSwitcher } from './TeamSwitcher';
import { NavUser } from './NavUser';
import { routes } from 'shared/config';

const data = {
  user: {
    name: 'whoami',
    email: 'mail@example.com',
    avatar: 'https://cdn.ttopen.ru/test.jpeg',
  },
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
                <Link href={routes.team.profile()}>
                  <UserRound />
                  <span>Мой профиль</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={routes.team.tasks()}>
                  <ListTodo />
                  <span>Мои задачи</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={routes.team.projects()}>
                  <FolderKanban />
                  <span>Мои Проекты</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
