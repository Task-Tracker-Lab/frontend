'use client';
import { useState } from 'react';
import { FolderPlus, Plus, UsersRound, LayoutGrid } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTeamStore } from 'entities/team';
import { CreateProjectDialog } from 'features/projects/create';
import { CreateTeamDialog } from 'features/teams/create';
import { CreateBoardDialog } from 'features/boards/create';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'shared/ui';
import { QuickCreateItem } from './QuickCreateItem'; // ← Новый импорт

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
          <QuickCreateItem
            icon={<UsersRound className="text-muted-foreground" />}
            title="Команда"
            description="Создать новую команду"
            onOpenChange={() => {
              setOpen(false);
              setCreateTeamOpen(true);
            }}
          />

          <QuickCreateItem
            icon={<FolderPlus className="text-muted-foreground" />}
            title="Проект"
            description="Создать новый проект"
            disabled={!teamId}
            onOpenChange={() => {
              setOpen(false);
              setCreateProjectOpen(true);
            }}
          />

          <QuickCreateItem
            icon={<LayoutGrid className="text-muted-foreground" />}
            title="Доска"
            description="Создать новую доску в проекте"
            disabled={!projectSlug}
            onOpenChange={() => {
              setOpen(false);
              setCreateBoardOpen(true);
            }}
          />
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
