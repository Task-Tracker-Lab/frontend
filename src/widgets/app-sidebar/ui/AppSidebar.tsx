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
import Link from 'next/link';

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
          <Link href={`http://localhost:3001/oauth?success=true&message=Вход+успешен`}>тест</Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
