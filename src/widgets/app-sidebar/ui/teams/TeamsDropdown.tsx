'use client';
import { CreateTeamDialog } from 'features/teams/create';
import Link from 'next/link';
import { routes } from 'shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenuButton,
} from 'shared/ui';
import { useTeamsDropdown } from '../../model/useTeamsDropdown';
import { TeamItem } from './TeamItem';
import { TeamTrigger } from './TeamTrigger';
import { useIsMobile } from 'shared/lib/hooks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function TeamsDropdown() {
  const { open, setOpen, query, visibleTeams, teams, hasMoreTeams, switchTeam } =
    useTeamsDropdown();
  const isMobile = useIsMobile();
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
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
          side={isMobile ? 'bottom' : 'right'}
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setCreateTeamOpen(true);
            }}
          >
            <span className="flex items-center gap-2">
              <Plus className="size-4" />
              Создать команду
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateTeamDialog dialog={{ open: createTeamOpen, onOpenChange: setCreateTeamOpen }} />
    </>
  );
}
