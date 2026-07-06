'use client';

import dynamic from 'next/dynamic';
import { TaskFallback } from './TaskFallback';

const TaskContent = dynamic(() => import('./TaskContent').then((mod) => mod.TaskContent), {
  ssr: false,
  loading: () => <TaskFallback />,
});

interface TaskProps {
  taskId: string;
  projectSlug: string;
  boardSlug: string;
}

export function Task({ taskId, projectSlug, boardSlug }: TaskProps) {
  return <TaskContent taskId={taskId} projectSlug={projectSlug} boardSlug={boardSlug} />;
}
