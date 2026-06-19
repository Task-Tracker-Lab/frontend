'use client';

import { useQuery } from '@tanstack/react-query';
import { projectIconCodeToEmoji, ProjectQueries } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { CreateProjectDialog } from 'features/projects/create';
import { BriefcaseBusiness, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from 'shared/config';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from 'shared/ui';
import { ProjectActions } from './ProjectActions';

export function ProjectsContent() {
  const teamId = useTeamStore.use.teamId();
  const router = useRouter();
  const pathname = usePathname();
  const { open, isMobile } = useSidebar();
  const projects = useQuery({ ...ProjectQueries.getProjects(teamId!), enabled: !!teamId });

  if (!projects.data) {
    return null;
  }

  const projectList = projects.data?.items.slice(0, 6) ?? [];
  const totalProjects = projects.data?.items.length ?? 0;
  const isAllowedToHighlight = !open && !isMobile;

  const handleClickTrigger = () => {
    if (isAllowedToHighlight) {
      router.push(routes.team.projects());
    }
  };

  return (
    <Collapsible asChild className="group/collapsible" defaultOpen>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="group-has-data-[sidebar=menu-action]/menu-item:pr-2"
            onClick={handleClickTrigger}
            isActive={isAllowedToHighlight && pathname?.startsWith(routes.team.projects())}
            tooltip="Проекты"
          >
            <BriefcaseBusiness />
            Проекты
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content">
          <SidebarMenuSub>
            {projectList.map((project) => (
              <SidebarMenuSubItem key={project.id}>
                <SidebarMenuSubButton
                  isActive={pathname?.startsWith(routes.team.project.root(project.id))}
                  asChild
                >
                  <Link href={routes.team.project.root(project.slug)}>
                    <span>{projectIconCodeToEmoji(project.icon)}</span> {project.name}
                  </Link>
                </SidebarMenuSubButton>
                <ProjectActions project={project} teamId={teamId} asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </ProjectActions>
              </SidebarMenuSubItem>
            ))}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <CreateProjectDialog className="w-full">
                  <Plus /> Новый проект
                </CreateProjectDialog>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            {totalProjects > 0 ? (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton isActive={pathname === routes.team.projects()} asChild>
                  <Link href={routes.team.projects()} className="!text-muted-foreground">
                    Все проекты ({totalProjects})
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ) : null}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
