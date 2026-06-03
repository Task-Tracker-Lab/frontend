import { Skeleton } from 'shared/ui';
import { BoardButtonSkeleton } from './BoardButton.skeleton';
import { TaskColumnSkeleton } from './TaskColumn.skeleton';

export function ProjectBoardsSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2 px-5 pt-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <BoardButtonSkeleton key={index} />
        ))}
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      <div className="grow overflow-x-auto overscroll-x-contain p-2 pl-5">
        <div className="flex h-full flex-nowrap gap-2.5">
          <TaskColumnSkeleton />
          <TaskColumnSkeleton taskCount={2} />
          <TaskColumnSkeleton taskCount={4} />
        </div>
      </div>
    </div>
  );
}
