'use client';

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  NotebookIcon,
  PieChart,
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
import { NavProjects } from 'widgets/app-sidebar/ui/NavProjects';
import { NavUser } from 'widgets/app-sidebar/ui/NavUser';
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
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
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
                <Link href={routes.team.tasks()}>
                  <NotebookIcon />
                  <span>Мои задачи</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
