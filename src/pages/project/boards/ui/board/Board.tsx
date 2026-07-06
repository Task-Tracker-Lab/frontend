'use client';

import { arrayMove } from '@dnd-kit/sortable';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import { TTask } from 'entities/task';
import { useCallback } from 'react';
import { classNames } from 'shared/lib/utils';
import {
  Kanban,
  KanbanBoard,
  KanbanColumnMoveEvent,
  KanbanItemMoveEvent,
  KanbanOverlay,
} from 'shared/ui';
import { useBoardDataQuery } from '../../api/useBoardDataQuery';
import { buildMoveColumnBody } from '../../lib/build-move-column-body';
import { buildMoveTaskBody } from '../../lib/build-move-task-body';
import { useMoveColumn } from '../../api/useMoveColumn';
import { useMoveTask } from '../../api/useMoveTask';
import { useSetBoardColumnOrder } from '../../model/useSetBoardColumnOrder';
import { useSetBoardTasks } from '../../model/useSetBoardTasks';
import { Column } from '../column/Column';

interface BoardProps extends Omit<React.ComponentProps<typeof KanbanBoard>, 'children'> {
  projectSlug: string;
  boardSlug: string;
}

export const Board = ({ projectSlug, boardSlug, className, ...props }: BoardProps) => {
  const value = useBoardDataQuery(projectSlug, boardSlug);
  const columns = useSuspenseQuery(BoardQueries.getBoardColumnList(boardSlug));
  const setTasks = useSetBoardTasks(projectSlug, boardSlug);
  const setColumnOrder = useSetBoardColumnOrder(boardSlug);
  const { mutate: moveTask } = useMoveTask();
  const { mutate: moveColumn } = useMoveColumn();

  const handleValueChange = useCallback(
    (nextValue: Record<string, TTask.Task[]>, draggedTaskId?: string, draggedColumnId?: string) => {
      setTasks(nextValue, draggedTaskId);

      if (draggedColumnId) {
        setColumnOrder(Object.keys(nextValue), draggedColumnId);
      }
    },
    [setColumnOrder, setTasks]
  );

  const handleItemMove = useCallback(
    ({ taskId, toContainer }: KanbanItemMoveEvent<TTask.Task>) => {
      moveTask({
        slug: projectSlug,
        key: boardSlug,
        taskId,
        body: buildMoveTaskBody(value, taskId, toContainer),
      });
    },
    [boardSlug, moveTask, projectSlug, value]
  );

  const handleColumnMove = useCallback(
    ({ columnId, fromIndex, toIndex }: KanbanColumnMoveEvent) => {
      const columnOrder = arrayMove(Object.keys(value), fromIndex, toIndex);

      moveColumn({
        boardSlug,
        columnId,
        body: buildMoveColumnBody(columns.data, columnId, columnOrder),
      });
    },
    [boardSlug, columns.data, moveColumn, value]
  );

  return (
    <Kanban
      value={value}
      onValueChange={handleValueChange}
      onItemMoveEnd={handleItemMove}
      onColumnMoveEnd={handleColumnMove}
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
