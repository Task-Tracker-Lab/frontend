'use client';

import { Button } from 'shared/ui';
import { CreateBoardDialog } from 'features/boards/create';
import { PropsWithChildren, useState } from 'react';
import { BoardQueries, type TBoard } from 'entities/board';
import { useActiveBoards } from 'pages/project/model/useActiveBoard';
import { useBoardsPage } from 'pages/project/model/useBoardsPage';
import { ProjectBoardsSkeleton } from './ProjectBoards.skeleton';
import { ProjectBoardsError } from './ProjectBoardsError';
import { useQuery } from '@tanstack/react-query';
import { ProjectBoardsHeader } from './ProjectBoardsHeader';
import { ProjectBoardsContent } from './ProjectBoardsContent';
import { ProjectBoardButton } from './ProjectBoardButton';

export function ProjectBoards({ slug }: PropsWithChildren<{ slug: string }>) {
  const { data, isLoading, isError, error, refetch } = useBoardsPage(slug);
  const { activeBoard, activeBoardSlug } = useActiveBoards(data ?? []);
  const [view, setView] = useState<TBoard.BoardViewType>(activeBoard?.defaultView ?? 'kanban');
  const columns = useQuery({
    ...BoardQueries.getBoardColumnList(activeBoardSlug!),
    enabled: !!activeBoardSlug,
  });

  if (isLoading) return <ProjectBoardsSkeleton />;
  if (isError) {
    return <ProjectBoardsError message={error?.message} onRetry={() => refetch()} />;
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2 px-5 pt-5">
        {data?.map((item) => (
          <ProjectBoardButton projectSlug={slug} key={item.id} board={item} />
        ))}
        <CreateBoardDialog asChild>
          <Button>Создать доску</Button>
        </CreateBoardDialog>
      </div>
      <div className="flex grow flex-col gap-2 overflow-x-auto overscroll-x-contain p-2 pl-5">
        <ProjectBoardsHeader currentView={view} onViewChange={(v) => setView(v)} />
        {activeBoard && columns.data ? (
          <ProjectBoardsContent
            view={view}
            data={{ board: activeBoard, columns: columns.data, tasks: [] }}
          />
        ) : null}
      </div>
    </div>
  );
}
