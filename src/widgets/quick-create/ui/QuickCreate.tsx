'use client';
import { useState, type ComponentType } from 'react';
import { FolderPlus, Plus, UsersRound, LayoutGrid } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTeamStore } from 'entities/team';
import { CreateProjectDialog } from 'features/projects/create';
import { CreateTeamDialog } from 'features/teams/create';
import { CreateBoardDialog } from 'features/boards/create';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'shared/ui';
import { QuickCreateItem } from './QuickCreateItem';

interface MenuItemConfig {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
  onOpenChange: () => void;
}

export function QuickCreate() {
  const teamId = useTeamStore.use.teamId();
  const [open, setOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createBoardOpen, setCreateBoardOpen] = useState(false);

  const params = useParams<{ projectSlug: string }>();
  const projectSlug = params?.projectSlug;

  const menuItems: MenuItemConfig[] = [
    {
      title: 'Команда',
      description: 'Создать новую команду',
      icon: UsersRound,
      onOpenChange: () => {
        setOpen(false);
        setCreateTeamOpen(true);
      },
    },
    {
      title: 'Проект',
      description: 'Создать новый проект',
      icon: FolderPlus,
      disabled: !teamId,
      onOpenChange: () => {
        setOpen(false);
        setCreateProjectOpen(true);
      },
    },
    {
      title: 'Доска',
      description: 'Создать новую доску в проекте',
      icon: LayoutGrid,
      disabled: !projectSlug,
      onOpenChange: () => {
        setOpen(false);
        setCreateBoardOpen(true);
      },
    },
  ];

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
          {menuItems.map((item) => (
            <QuickCreateItem key={item.title} {...item} />
          ))}
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
