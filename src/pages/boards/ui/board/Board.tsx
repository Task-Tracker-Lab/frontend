'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import { TTask } from 'entities/task';
import { useCallback } from 'react';
import { classNames } from 'shared/lib/utils';
import { Kanban, KanbanBoard, KanbanItemMoveEvent, KanbanOverlay } from 'shared/ui';
import { useBoardDataQuery } from '../../api/useBoardDataQuery';
import { useMoveTask } from '../../model/useMoveTask';
import { useSetBoardTasks } from '../../model/useSetBoardTasks';
import { Column } from '../column/Column';

interface BoardProps extends Omit<React.ComponentProps<typeof KanbanBoard>, 'children'> {
  projectSlug: string;
  boardSlug: string;
}

export const Board = ({ projectSlug, boardSlug, className, ...props }: BoardProps) => {
  const value = useBoardDataQuery(projectSlug, boardSlug);
  const columns = useSuspenseQuery(BoardQueries.getBoardColumnList(boardSlug));
  const setValue = useSetBoardTasks(projectSlug, boardSlug);
  const { mutate: moveTask } = useMoveTask();

  const handleItemMove = useCallback(
    ({ taskId, item, toContainer, toIndex }: KanbanItemMoveEvent<TTask.Task>) => {
      moveTask({
        slug: projectSlug,
        key: boardSlug,
        taskId,
        body: {
          targetStateId: toContainer,
          targetAreaId: item.areaId,
          position: toIndex,
        },
      });
    },
    [boardSlug, moveTask, projectSlug]
  );

  return (
    <Kanban
      value={value}
      onValueChange={setValue}
      onItemMoveEnd={handleItemMove}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className={classNames('flex h-full flex-nowrap', {}, [className])} {...props}>
        {Object.entries(value).map(([columnId, tasks]) => {
          return (
            <Column
              key={columnId}
              value={columnId}
              projectSlug={projectSlug}
              boardSlug={boardSlug}
              title={columns.data[columnId].title}
              id={columnId}
              color={columns.data[columnId].color ?? ''}
              tasks={tasks}
            />
          );
        })}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  );
};
