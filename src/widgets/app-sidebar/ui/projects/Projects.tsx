'use client';

import dynamic from 'next/dynamic';
import { ProjectsFallback } from './ProjectsFallback';

const ProjectsContent = dynamic(
  () => import('./ProjectsContent').then((mod) => mod.ProjectsContent),
  {
    ssr: false,
    loading: () => <ProjectsFallback />,
  }
);

export function Projects() {
  return <ProjectsContent />;
}
