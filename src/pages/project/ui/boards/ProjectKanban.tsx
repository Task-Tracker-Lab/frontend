'use client';

import { useState } from 'react';
import type { MockBoard } from '../../model/boards-mock';
import { Kanban, KanbanBoard, KanbanOverlay } from 'shared/ui';
import { TaskColumn } from './TaskColumn';

interface ProjectKanbanProps {
  board: Pick<MockBoard, 'columnTitles' | 'columns'>;
}

export function ProjectKanban({ board }: ProjectKanbanProps) {
  const [columns, setColumns] = useState(board.columns);

  return (
    <Kanban value={columns} onValueChange={(v) => setColumns(v)} getItemValue={(item) => item.id}>
      <KanbanBoard>
        {Object.entries(columns).map(([id, items]) => (
          <TaskColumn key={id} value={id} tasks={items} columnTitles={board.columnTitles} />
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  );
}
