'use client';

import { useCurrentUserActivity } from 'entities/user';

interface ProjectsPageProps {
  className?: string;
}

function ProjectsPage({ className }: ProjectsPageProps) {
  useCurrentUserActivity(); //todo временно для линтера fsd
  return <div className={className}>Проекты</div>;
}

export { ProjectsPage };
