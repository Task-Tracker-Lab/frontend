import { Skeleton } from 'shared/ui';

const COLUMN_COUNT = 4;
const BOARD_TAB_COUNT = 3;
const TASK_COUNTS = [3, 2, 4, 2] as const;

function BoardColumnSkeleton({ taskCount }: { taskCount: number }) {
  return (
    <div
      className="border-border bg-secondary flex h-min w-[320px] min-w-[320px] flex-col gap-2.5 overflow-hidden rounded-xl border"
      aria-hidden
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-3 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="flex flex-col gap-2.5 px-2.5 pb-2">
        {Array.from({ length: taskCount }).map((_, index) => (
          <Skeleton
            key={index}
            className={index % 2 === 0 ? 'h-20 w-full rounded-lg' : 'h-[6.5rem] w-full rounded-lg'}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export function BoardsPageFallback() {
  return (
    <div className="flex h-full flex-col gap-5 pt-5" aria-busy="true" aria-label="Загрузка доски">
      <div className="flex flex-wrap justify-between gap-2 px-4">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: BOARD_TAB_COUNT }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-28 rounded-md" aria-hidden />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-36 rounded-md" aria-hidden />
          <Skeleton className="h-9 w-36 rounded-md" aria-hidden />
        </div>
      </div>
      <div className="flex grow flex-col overflow-x-auto px-4">
        <div className="flex h-full flex-nowrap gap-4">
          {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
            <BoardColumnSkeleton key={index} taskCount={TASK_COUNTS[index]} />
          ))}
        </div>
      </div>
    </div>
  );
}
