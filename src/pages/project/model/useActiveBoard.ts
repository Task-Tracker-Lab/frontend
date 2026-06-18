import { useEffect } from 'react';
import { useBoardStore } from './store';
import { TBoard } from 'entities/board';

export const useActiveBoards = (boards: TBoard.BoardResponse[]) => {
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const setActiveBoardId = useBoardStore((s) => s.setBoardId);

  const activeBoard: TBoard.BoardResponse | null =
    boards?.find((v) => v.id === activeBoardId) ?? (boards.length > 0 ? boards[0] : null);

  useEffect(() => {
    if (!activeBoardId && boards.length > 0) {
      setActiveBoardId(boards[0].id, boards[0].slug);
    }
  }, [activeBoardId, boards, setActiveBoardId]);

  return { activeBoardId, setActiveBoardId, activeBoard };
};
