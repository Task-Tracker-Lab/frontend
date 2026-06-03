import { useEffect } from 'react';
import { useBoardStore } from './store';
import { BoardWithTasks } from 'entities/board';

export const useActiveBoards = (boards: BoardWithTasks[]) => {
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const setActiveBoardId = useBoardStore((s) => s.setBoardId);

  const activeBoard: BoardWithTasks | null =
    boards?.find((v) => v.board.id === activeBoardId) ?? (boards.length > 0 ? boards[0] : null);

  useEffect(() => {
    if (!activeBoardId && boards.length > 0) {
      setActiveBoardId(boards[0].board.id);
    }
  }, [activeBoardId, boards, setActiveBoardId]);

  return { activeBoardId, setActiveBoardId, activeBoard };
};
