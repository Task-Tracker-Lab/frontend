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
import { useInitProjectId } from 'entities/project';
import { ComponentProps, PropsWithChildren } from 'react';
import { TBoard } from 'entities/board';
import { useBoardStore } from 'pages/project/model/store';
import { EllipsisVertical } from 'lucide-react';
import { ProjectKanban } from './ProjectKanban';
import { useActiveBoards } from 'pages/project/model/useActiveBoard';
import { useBoardsPage } from 'pages/project/model/useBoardsPage';
import { cn } from 'shared/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { RemoveBoardDialog } from 'features/boards/remove';

export function ProjectBoards({ projectId }: PropsWithChildren<{ projectId: string }>) {
  useInitProjectId(projectId);

  const { data, isLoading, isError } = useBoardsPage(projectId);
  const { activeBoard, activeBoardId } = useActiveBoards(data);
  // TODO: добавить скелетоны
  if (isLoading) return 'Загружаем доски';
  if (isError) return 'Ошибка загрузки';
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2 px-5 pt-5">
        {data?.map((item) => (
          <BoardButton key={item.board.id} board={item.board} />
        ))}
        <CreateBoardDialog asChild>
          <Button>Создать доску</Button>
        </CreateBoardDialog>
      </div>
      <div className="grow overflow-x-auto overscroll-x-contain p-2 pl-5">
        {activeBoard ? <ProjectKanban key={activeBoardId} board={activeBoard} /> : null}
      </div>
    </div>
  );
}

type BoardButtonProps = ComponentProps<'div'> &
  VariantProps<typeof buttonVariants> & {
    board: TBoard.BoardResponse;
  };

function BoardButton({
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
        onClick={() => setActiveBoardId(board.id)}
        className="h-full px-3 text-left"
      >
        <span>{board.name}</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="h-full">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <RemoveBoardDialog projectId={board.projectId} boardId={board.id} asChild>
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              Удалить
            </DropdownMenuItem>
          </RemoveBoardDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
