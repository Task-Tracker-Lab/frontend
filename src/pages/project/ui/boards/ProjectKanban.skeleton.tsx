import { TaskColumnSkeleton } from './TaskColumn.skeleton';

export function ProjectKanbanSkeleton() {
  return (
    <div className="flex h-full flex-nowrap gap-2.5">
      <TaskColumnSkeleton />
      <TaskColumnSkeleton taskCount={2} />
      <TaskColumnSkeleton taskCount={4} />
    </div>
  );
}
