'use client';

import { useQuery } from '@tanstack/react-query';
import { ProjectQueries } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { CreateProjectDialog } from 'features/projects/create';
import { Plus } from 'lucide-react';
import { Button } from 'shared/ui';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCard.skeleton';
import { ProjectsEmpty } from './ProjectsEmpty';

export function ProjectsPage() {
  const slug = useTeamStore.use.slug();
  const { data, isPending } = useQuery({
    ...ProjectQueries.getProjects(slug!),
    enabled: !!slug,
  });

  if (!isPending && !data?.items.length) {
    return <ProjectsEmpty />;
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
        <CreateProjectDialog asChild>
          <Button disabled={!slug}>
            <Plus size={15} /> Создать проект
          </Button>
        </CreateProjectDialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          : data?.items.map((project) => (
              <ProjectCard key={project.id} project={project} className="h-full" />
            ))}
      </div>
    </>
  );
}
