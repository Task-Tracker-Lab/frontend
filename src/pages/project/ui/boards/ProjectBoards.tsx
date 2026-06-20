'use client';

import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  buttonVariants,
} from 'shared/ui';
import { CreateBoardDialog } from 'features/boards/create';
import { ComponentProps, PropsWithChildren } from 'react';
import { BoardMapper, BoardQueries, TBoard } from 'entities/board';
import { useBoardStore } from 'pages/project/model/store';
import { EllipsisVertical } from 'lucide-react';
import { ProjectKanban } from './ProjectKanban';
import { useActiveBoards } from 'pages/project/model/useActiveBoard';
import { useBoardsPage } from 'pages/project/model/useBoardsPage';
import { cn } from 'shared/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { RemoveBoardDialog } from 'features/boards/remove';
import { ProjectBoardsSkeleton } from './ProjectBoards.skeleton';
import { ProjectBoardsError } from './ProjectBoardsError';
import { useQuery } from '@tanstack/react-query';

export function ProjectBoards({ slug }: PropsWithChildren<{ slug: string }>) {
  const { data, isLoading, isError, error, refetch } = useBoardsPage(slug);
  const { activeBoard, activeBoardSlug } = useActiveBoards(data ?? []);

  const columns = useQuery({
    ...BoardQueries.getBoardColumnList(activeBoardSlug!),
    enabled: !!activeBoardSlug,
  });

  const board =
    activeBoard && columns.data ? BoardMapper.toBoardWithTasks(activeBoard, columns.data) : null;

  if (isLoading) return <ProjectBoardsSkeleton />;
  if (isError) {
    return <ProjectBoardsError message={error?.message} onRetry={() => refetch()} />;
  }
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2 px-5 pt-5">
        {data?.map((item) => (
          <BoardButton projectSlug={slug} key={item.id} board={item} />
        ))}
        <CreateBoardDialog asChild>
          <Button>Создать доску</Button>
        </CreateBoardDialog>
      </div>
      <div className="grow overflow-x-auto overscroll-x-contain p-2 pl-5">
        {board ? <ProjectKanban key={activeBoardSlug} board={board} /> : null}
      </div>
    </div>
  );
}

type BoardButtonProps = ComponentProps<'div'> &
  VariantProps<typeof buttonVariants> & {
    board: TBoard.BoardResponse;
    projectSlug: string;
  };

function BoardButton({
  projectSlug,
  board,
  className,
  variant = 'outline',
  size = 'default',
  ...props
}: BoardButtonProps) {
  const setActiveBoardId = useBoardStore((s) => s.setBoardId);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  return (
    <div
      className={cn(
        buttonVariants({
          variant: activeBoardId === board.id ? 'default' : variant,
          size,
          className,
        }),
        'px-0'
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setActiveBoardId(board.id, board.slug)}
        className="h-full px-3 text-left"
      >
        <span>{board.title}</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="h-full">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <RemoveBoardDialog projectSlug={projectSlug} boardSlug={board.slug} asChild>
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              Удалить
            </DropdownMenuItem>
          </RemoveBoardDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
