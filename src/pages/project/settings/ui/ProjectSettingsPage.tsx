'use client';

import { useTeamStore } from 'entities/team';
import dynamic from 'next/dynamic';
import { ProjectSettingsPageFallback } from './ProjectSettingsPageFallback';

const ProjectSettingsPageContent = dynamic(
  () => import('./ProjectSettingsPageContent').then((mod) => mod.ProjectSettingsPageContent),
  {
    ssr: false,
    loading: () => <ProjectSettingsPageFallback />,
  }
);

interface ProjectSettingsPageProps {
  projectSlug: string;
}

export function ProjectSettingsPage({ projectSlug }: ProjectSettingsPageProps) {
  const teamId = useTeamStore.use.teamId();

  if (!teamId) {
    return <ProjectSettingsPageFallback />;
  }

  return <ProjectSettingsPageContent projectSlug={projectSlug} teamId={teamId} />;
}
