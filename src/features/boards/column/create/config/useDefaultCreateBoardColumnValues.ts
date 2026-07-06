'use client';

import { useQueryClient } from '@tanstack/react-query';
import { BoardQueries, calculateNewPosition, type TBoard } from 'entities/board';
import { PROJECT_COLORS } from 'entities/project';
import { CreateBoardColumnFormValues } from '../model/types';

export function useDefaultCreateBoardColumnValues(
  boardSlug: string
): () => CreateBoardColumnFormValues {
  const queryClient = useQueryClient();

  return () => {
    const columns = queryClient.getQueryData<Record<string, TBoard.BoardColumnResponse>>(
      BoardQueries.getBoardColumnList(boardSlug).queryKey
    );

    const lastPosition = columns
      ? Math.max(...Object.values(columns).map((column) => column.position))
      : null;

    return {
      title: '',
      color: PROJECT_COLORS[0],
      position: calculateNewPosition(lastPosition, null),
    };
  };
}
