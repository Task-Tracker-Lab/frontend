'use client';

import { useQuery } from '@tanstack/react-query';
import { projectIconCodeToEmoji, ProjectQueries } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { ArchiveProjectDialog, RestoreProjectDialog } from 'features/projects/archive';
import { CreateProjectDialog } from 'features/projects/create';
import { ShareProjectDialog } from 'features/projects/share';
import { Archive, BriefcaseBusiness, Link2, MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { routes } from 'shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from 'shared/ui';

export function Projects() {
  const slug = useTeamStore.use.slug();
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const projects = useQuery({ ...ProjectQueries.getProjects(slug!), enabled: !!slug });
  const projectList = projects.data?.items.slice(0, 6) ?? [];
  const totalProjects = projects.data?.items.length ?? 0;

  if (!projects.data) {
    return null;
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Проекты</SidebarGroupLabel>
        <SidebarMenu>
          {projectList.map((project) => {
            const canManage = Boolean(slug && project.canEdit);

            return (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton
                  tooltip={project.name}
                  asChild
                  isActive={pathname === routes.team.project.root(project.id)}
                >
                  <Link href={routes.team.project.root(project.id)}>
                    <span>{projectIconCodeToEmoji(project.icon)}</span>
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">Действия с проектом</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg"
                    side={isMobile ? 'bottom' : 'right'}
                    align={isMobile ? 'end' : 'start'}
                  >
                    <ShareProjectDialog
                      projectName={project.name}
                      teamSlug={slug!}
                      projectId={project.id}
                      asChild
                      disabled={!slug}
                    >
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Link2 className="text-muted-foreground" />
                        <span>Создать публичную ссылку</span>
                      </DropdownMenuItem>
                    </ShareProjectDialog>
                    {project.status === 'archived' ? (
                      <RestoreProjectDialog
                        projectName={project.name}
                        teamSlug={slug!}
                        projectId={project.id}
                        asChild
                        disabled={!canManage}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Archive className="text-muted-foreground" />
                          <span>Восстановить</span>
                        </DropdownMenuItem>
                      </RestoreProjectDialog>
                    ) : (
                      project.status !== 'template' && (
                        <ArchiveProjectDialog
                          projectName={project.name}
                          teamSlug={slug!}
                          projectId={project.id}
                          asChild
                          disabled={!canManage}
                        >
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Archive className="text-muted-foreground" />
                            <span>Архивировать</span>
                          </DropdownMenuItem>
                        </ArchiveProjectDialog>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Все проекты"
              asChild
              isActive={routes.team.projects() === pathname}
            >
              <Link href={routes.team.projects()}>
                <BriefcaseBusiness />
                <span>Все проекты {!!totalProjects && `(${totalProjects})`}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setCreateProjectOpen(true)}
              tooltip={'Добавить проект'}
            >
              <Plus />
              <span>Добавить проект</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <CreateProjectDialog
        dialog={{ open: createProjectOpen, onOpenChange: setCreateProjectOpen }}
      />
    </>
  );
}
