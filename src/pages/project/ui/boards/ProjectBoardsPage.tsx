'use client';

import { useState } from 'react';
import { Button } from 'shared/ui';
import { MOCK_BOARDS } from '../../model/boards-mock';
import { ProjectKanban } from './ProjectKanban';

export function ProjectBoardsPage() {
  const [activeBoardId, setActiveBoardId] = useState(MOCK_BOARDS[0].id);
  const activeBoard = MOCK_BOARDS.find((board) => board.id === activeBoardId) ?? MOCK_BOARDS[0];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2 px-5 pt-5">
        {MOCK_BOARDS.map((board) => (
          <Button
            key={board.id}
            type="button"
            variant={board.id === activeBoardId ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveBoardId(board.id)}
          >
            {board.name}
          </Button>
        ))}
      </div>

      <div className="grow overflow-x-auto overscroll-x-contain p-2 pl-5">
        <ProjectKanban key={activeBoard.id} board={activeBoard} />
      </div>
    </div>
  );
}
