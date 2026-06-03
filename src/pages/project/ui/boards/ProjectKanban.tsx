'use client';

import { useEffect, useState } from 'react';
import { Kanban, KanbanBoard, KanbanOverlay, Button } from 'shared/ui';
import { TaskColumn } from './task-column/TaskColumn';
import { BoardWithTasks } from 'entities/board';
import { TTask } from 'entities/task';
import { CreateBoardColumnDialog } from 'features/boards/column/create';

interface ProjectKanbanProps {
  board: BoardWithTasks;
}

export function ProjectKanban({ board }: ProjectKanbanProps) {
  const [columns, setColumns] = useState(board.tasksByColumn);

  useEffect(() => {
    setColumns(board.tasksByColumn);
  }, [board]);

  const nextColumnPosition = Object.keys(board.columns).length;

  return (
    <Kanban
      className="h-full"
      value={columns}
      onValueChange={(v) => setColumns(v)}
      // TODO: as TTask.Task - заглушка, пока нет тасок
      getItemValue={(item) => (item as TTask.Task).id}
    >
      <KanbanBoard className="flex h-full flex-nowrap">
        {Object.entries(columns).map(([id, items]) => {
          const column = board.columns[id];
          // TODO: as TTask.Task - заглушка, пока нет тасок
          return <TaskColumn key={id} value={id} tasks={items as TTask.Task[]} column={column} />;
        })}
        <div className="flex w-[250px] min-w-[250px] shrink-0 items-start">
          <CreateBoardColumnDialog
            boardId={board.board.id}
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
}
