'use client';

import { useEffect, useMemo, useState } from 'react';
import { Kanban, KanbanBoard, KanbanOverlay, Button } from 'shared/ui';
import { TaskColumn } from './task-column/TaskColumn';
import { boardFabricKeys, BoardMapper, KanbanBoardData, type TBoard } from 'entities/board';
import { TTask } from 'entities/task';
import { CreateBoardColumnDialog } from 'features/boards/column/create';
import { useQueryClient } from '@tanstack/react-query';
import { type ProjectBoardViewData } from '../../model/types';

interface ProjectKanbanProps {
  data: ProjectBoardViewData;
}

export const ProjectKanban = ({ data }: ProjectKanbanProps) => {
  const { columns, tasksByColumn } = useMemo(
    () => BoardMapper.toKanban(data.board, data.columns, data.tasks),
    [data.board, data.columns, data.tasks]
  );
  const [kanbanValue, setKanbanValue] = useState(tasksByColumn);

  useEffect(() => {
    setKanbanValue(tasksByColumn);
  }, [tasksByColumn]);

  const nextColumnPosition = data.columns.length;

  const queryClient = useQueryClient();

  const handleValueChange = async (value: KanbanBoardData['tasksByColumn']) => {
    setKanbanValue(value);
    queryClient.cancelQueries({ queryKey: boardFabricKeys.columns(data.board.slug) });

    const ids = Object.keys(value);
    const idsMap = new Map(ids.map((id, i) => [id, i]));
    const columnIdsToUpdate: { columnId: string; position: number }[] = [];

    const prevColumns = queryClient.getQueryData<TBoard.BoardColumnListResponse>(
      boardFabricKeys.columns(data.board.slug)
    );

    queryClient.setQueryData<TBoard.BoardColumnListResponse>(
      boardFabricKeys.columns(data.board.slug),
      (oldColumns) => {
        if (!oldColumns) return oldColumns;

        return oldColumns.map((column) => {
          const position = idsMap.get(column.id);
          return position !== undefined ? { ...column, position } : column;
        });
      }
    );

    prevColumns?.forEach((column) => {
      const position = idsMap.get(column.id);
      if (position !== undefined && column.position !== position) {
        columnIdsToUpdate.push({ columnId: column.id, position });
      }
    });

    //  TODO: тут должны быть логика и запрос на обновление позиций колоночек.
    // Если запрос выполнился с ошибкой, вывести тост и вернуть предыдущее состояние из prevColumns
  };

  return (
    <Kanban
      className="h-full"
      value={kanbanValue}
      onValueChange={handleValueChange}
      onMove={(event) => console.log(event)}
      getItemValue={(item) => (item as TTask.Task).id} // TODO: as TTask.Task - заглушка, пока нет тасок
    >
      <KanbanBoard className="flex h-full flex-nowrap">
        {Object.entries(kanbanValue).map(([id, items]) => {
          const column = columns[id];
          // TODO: as TTask.Task - заглушка, пока нет тасок
          return <TaskColumn key={id} value={id} tasks={items as TTask.Task[]} column={column} />;
        })}
        <div className="flex w-[250px] min-w-[250px] shrink-0 items-start">
          <CreateBoardColumnDialog
            boardSlug={data.board.slug}
            defaultPosition={nextColumnPosition}
            asChild
          >
            <Button variant="outline" className="w-full">
              Создать колонку
            </Button>
          </CreateBoardColumnDialog>
        </div>
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  );
};
