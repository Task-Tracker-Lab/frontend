'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ProjectQueries } from 'entities/project';
import { CreateProjectDialog } from 'features/projects/create';
import { Plus } from 'lucide-react';
import { Button } from 'shared/ui';
import { PageWrapper } from 'widgets/page-wrapper';
import { getProjectsCountText } from '../lib/get-projects-count-text';
import { ProjectCard } from './ProjectCard';

export function ProjectsPageContent({ teamId }: { teamId: string }) {
  const projectsQuery = useSuspenseQuery(ProjectQueries.getProjects(teamId));

  const projects = projectsQuery.data.items;

  return (
    <PageWrapper
      title="Проекты команды"
      className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3"
      description={`Вы работаете в ${getProjectsCountText(projects.length)}`}
      action={
        <CreateProjectDialog asChild>
          <Button type="button" variant="secondary">
            <Plus className="size-4" />
            Новый проект
          </Button>
        </CreateProjectDialog>
      }
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </PageWrapper>
  );
}
