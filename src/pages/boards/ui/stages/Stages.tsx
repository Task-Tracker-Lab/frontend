'use client';

import { useQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import { CreateBoardColumnDialog } from 'features/boards/column/create';
import { CreateBoardDialog } from 'features/boards/create';
import { RemoveBoardDialog } from 'features/boards/remove';
import { BetweenVerticalStartIcon, EllipsisVertical, SquareKanbanIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { routes } from 'shared/config';
import { classNames } from 'shared/lib/utils';
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

interface BoardListProps extends Omit<ComponentProps<'div'>, 'children'> {
  projectSlug: string;
  boardSlug: string;
}

export function BoardList({ projectSlug, boardSlug, className, ...rest }: BoardListProps) {
  const { data } = useQuery(BoardQueries.getBoardList(projectSlug));

  return (
    <div className={classNames('flex flex-wrap justify-between gap-2', {}, [className])} {...rest}>
      <ButtonGroup className="flex-wrap">
        {data?.map((item) => {
          const variant = boardSlug === item.slug ? 'default' : 'outline';
          return (
            <ButtonGroup key={item.id}>
              <Button className="px-6" variant={variant} asChild>
                <Link href={routes.team.projects.board(projectSlug, item.slug)}>{item.title}</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="h-full" asChild>
                  <Button variant={variant} size="icon">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-40">
                  <RemoveBoardDialog
                    projectSlug={projectSlug}
                    boardSlug={item.slug}
                    boardName={item.title}
                    asChild
                  >
                    <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="size-4" />
                      Удалить доску
                    </DropdownMenuItem>
                  </RemoveBoardDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          );
        })}
      </ButtonGroup>
      <div className="flex flex-wrap gap-2">
        <CreateBoardColumnDialog boardSlug={boardSlug} asChild>
          <Button variant="secondary">
            <BetweenVerticalStartIcon /> Добавить этап
          </Button>
        </CreateBoardColumnDialog>
        <CreateBoardDialog asChild>
          <Button variant="secondary">
            <SquareKanbanIcon /> Добавить доску
          </Button>
        </CreateBoardDialog>
      </div>
    </div>
  );
}
