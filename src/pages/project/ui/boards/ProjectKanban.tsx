'use client';

import { useState } from 'react';
import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from 'shared/ui';
import type { MockBoard, MockBoardCard } from '../../model/boards-mock';

interface ProjectKanbanProps {
  board: MockBoard;
}

export function ProjectKanban({ board }: ProjectKanbanProps) {
  const [cards, setCards] = useState<MockBoardCard[]>(board.cards);

  return (
    <KanbanProvider
      columns={board.columns}
      data={cards}
      onDataChange={setCards}
      className="min-h-[420px]"
    >
      {(column) => (
        <KanbanBoard key={column.id} id={column.id}>
          <KanbanHeader>{column.name}</KanbanHeader>
          <KanbanCards id={column.id}>
            {(item) => <KanbanCard key={item.id} {...item} />}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
}
