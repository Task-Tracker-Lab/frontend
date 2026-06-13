import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from 'shared/ui';
import { MyTeams } from './MyTeams';
import { Projects } from './projects/Projects';
import { Team } from './teams/Team';
import { TeamsDropdown } from './teams/TeamsDropdown';

export function AppSidebar({ ...props }: Omit<React.ComponentProps<typeof Sidebar>, 'children'>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamsDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <MyTeams />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <Team />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <Projects />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
