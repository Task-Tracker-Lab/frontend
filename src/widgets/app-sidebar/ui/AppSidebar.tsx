import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from 'shared/ui';
import { TeamsDropdown } from './teams/TeamsDropdown';
import { Projects } from './Projects';
import { MyTeams } from './MyTeams';
import { Team } from './Team';

export function AppSidebar({ ...props }: Omit<React.ComponentProps<typeof Sidebar>, 'children'>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamsDropdown />
      </SidebarHeader>
      <SidebarContent className="gap-2">
        <SidebarGroup>
          <SidebarMenu>
            <MyTeams />
            <Team />
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <Projects />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
