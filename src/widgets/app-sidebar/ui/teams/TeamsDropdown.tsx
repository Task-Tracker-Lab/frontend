import Link from 'next/link';
import { routes } from 'shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenuButton,
} from 'shared/ui';
import { useTeamsDropdown } from '../../model/useTeamsDropdown';
import { TeamItem } from './TeamItem';
import { TeamTrigger } from './TeamTrigger';

export function TeamsDropdown() {
  const { open, setOpen, query, visibleTeams, teams, hasMoreTeams, switchTeam } =
    useTeamsDropdown();

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            variant="outline"
            className="bg-primary/10 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <TeamTrigger query={query} />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="start"
          side={'bottom'}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-muted-foreground text-xs">Команды</DropdownMenuLabel>
          {visibleTeams.map((team, index) => (
            <DropdownMenuItem key={team.name} onClick={() => switchTeam(team.slug)} className="p-0">
              <TeamItem
                avatar={team.avatar}
                name={team.name}
                action={<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
              />
            </DropdownMenuItem>
          ))}
          {hasMoreTeams && (
            <DropdownMenuItem asChild className="text-muted-foreground text-xs">
              <Link href={routes.profile.teams()} onClick={() => setOpen(false)}>
                Все команды ({teams.length})
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
