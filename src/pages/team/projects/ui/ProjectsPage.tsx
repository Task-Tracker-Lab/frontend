'use client';

import { useTeamStore } from 'entities/team';
import dynamic from 'next/dynamic';
import { ProjectsPageFallback } from './ProjectsPageFallback';

const ProjectsPageContent = dynamic(
  () => import('./ProjectsPageContent').then((mod) => mod.ProjectsPageContent),
  {
    ssr: false,
    loading: () => <ProjectsPageFallback />,
  }
);

export function ProjectsPage() {
  const teamId = useTeamStore.use.teamId();

  if (!teamId) {
    return <ProjectsPageFallback />;
  }

  return <ProjectsPageContent teamId={teamId} />;
}
