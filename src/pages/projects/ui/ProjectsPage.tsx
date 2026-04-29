'use client';

import { UserQueries } from 'entities/user';
import { useQuery } from '@tanstack/react-query';

interface ProjectsPageProps {
  className?: string;
}

function ProjectsPage({ className }: ProjectsPageProps) {
  useQuery(UserQueries.getMe()); //todo временно для линтера fsd
  return <div className={className}>Проекты</div>;
}

export { ProjectsPage };
