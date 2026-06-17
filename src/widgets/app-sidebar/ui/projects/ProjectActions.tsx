'use client';

import { TProject } from 'entities/project';
import { ArchiveProjectDialog, RestoreProjectDialog } from 'features/projects/archive';
import { ShareProjectDialog } from 'features/projects/share';
import { Archive, Link2 } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useSidebar,
} from 'shared/ui';

interface ProjectActionsProps extends ComponentProps<typeof DropdownMenuTrigger> {
  project: TProject.ProjectListItemResponse;
  teamId?: string | null;
}

export function ProjectActions({ project, teamId, ...props }: ProjectActionsProps) {
  const { isMobile } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const canManage = Boolean(teamId && (project.role === 'owner' || project.role === 'admin'));

  const openDialog = (setDialogOpen: (open: boolean) => void) => (event: Event) => {
    event.preventDefault();
    setDropdownOpen(false);
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger {...props} />
        <DropdownMenuContent
          className="min-w-36 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
          <DropdownMenuItem disabled={!teamId} onSelect={openDialog(setShareOpen)}>
            <Link2 className="text-muted-foreground" />
            <span>Опубликовать</span>
          </DropdownMenuItem>
          {project.status === 'archived' ? (
            <DropdownMenuItem disabled={!canManage} onSelect={openDialog(setRestoreOpen)}>
              <Archive className="text-muted-foreground" />
              <span>Восстановить</span>
            </DropdownMenuItem>
          ) : (
            project.status !== 'template' && (
              <DropdownMenuItem disabled={!canManage} onSelect={openDialog(setArchiveOpen)}>
                <Archive className="text-muted-foreground" />
                <span>Архивировать</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareProjectDialog
        projectName={project.name}
        teamId={teamId!}
        slug={project.slug}
        dialog={{ open: shareOpen, onOpenChange: setShareOpen }}
      />
      {project.status === 'archived' ? (
        <RestoreProjectDialog
          projectName={project.name}
          teamId={teamId!}
          slug={project.slug}
          dialog={{ open: restoreOpen, onOpenChange: setRestoreOpen }}
        />
      ) : (
        project.status !== 'template' && (
          <ArchiveProjectDialog
            projectName={project.name}
            teamId={teamId!}
            slug={project.slug}
            dialog={{ open: archiveOpen, onOpenChange: setArchiveOpen }}
          />
        )
      )}
    </>
  );
}
