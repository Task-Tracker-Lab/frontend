'use client';

import { useState } from 'react';
import { FolderPlus, Plus, UsersRound, LayoutGrid } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTeamStore } from 'entities/team';
import { CreateProjectDialog } from 'features/projects/create';
import { CreateTeamDialog } from 'features/teams/create';
import { CreateBoardDialog } from 'features/boards/create';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

export function QuickCreate() {
  const teamId = useTeamStore.use.teamId();
  const [open, setOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createBoardOpen, setCreateBoardOpen] = useState(false);
  const params = useParams<{ projectSlug: string }>();
  const projectSlug = params?.projectSlug;

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="size-10 rounded-full"
            variant="outline"
            size="icon"
            aria-label="Быстрое создание"
          >
            <Plus className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setCreateTeamOpen(true);
            }}
          >
            <Item className="flex-nowrap p-0">
              <ItemMedia className="bg-primary/20 rounded-full p-2">
                <UsersRound className="text-muted-foreground" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Команда</ItemTitle>
                <ItemDescription className="whitespace-nowrap">
                  Создать новую команду
                </ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!teamId}
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setCreateProjectOpen(true);
            }}
          >
            <Item className="flex-nowrap p-0">
              <ItemMedia className="bg-primary/20 rounded-full p-2">
                <FolderPlus className="text-muted-foreground" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Проект</ItemTitle>
                <ItemDescription className="whitespace-nowrap">
                  Создать новый проект
                </ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!projectSlug}
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setCreateBoardOpen(true);
            }}
          >
            <Item className="flex-nowrap p-0">
              <ItemMedia className="bg-primary/20 rounded-full p-2">
                <LayoutGrid className="text-muted-foreground" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Доска</ItemTitle>
                <ItemDescription className="whitespace-nowrap">
                  Создать новую доску в проекте
                </ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateTeamDialog dialog={{ open: createTeamOpen, onOpenChange: setCreateTeamOpen }} />
      <CreateProjectDialog
        dialog={{ open: createProjectOpen, onOpenChange: setCreateProjectOpen }}
      />
      <CreateBoardDialog dialog={{ open: createBoardOpen, onOpenChange: setCreateBoardOpen }} />
    </div>
  );
}
