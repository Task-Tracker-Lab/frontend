import { useQueryClient } from '@tanstack/react-query';
import { boardFabricKeys, calculateNewPosition, type TBoard } from 'entities/board';
import { useCallback } from 'react';

export function useSetBoardColumnOrder(boardSlug: string) {
  const queryClient = useQueryClient();

  return useCallback(
    (columnOrder: string[], draggedColumnId?: string) => {
      const queryKey = boardFabricKeys.columns(boardSlug);

      queryClient.setQueriesData<Record<string, TBoard.BoardColumnResponse>>(
        { queryKey },
        (columns) => {
          if (!columns) {
            return columns;
          }

          const orderedColumns = columnOrder.map((id) => columns[id]).filter(Boolean);

          return orderedColumns.reduce<Record<string, TBoard.BoardColumnResponse>>(
            (acc, column, index, array) => {
              acc[column.id] = {
                ...column,
                position:
                  draggedColumnId === column.id
                    ? calculateNewPosition(
                        array[index - 1]?.position ?? null,
                        array[index + 1]?.position ?? null
                      )
                    : column.position,
              };
              return acc;
            },
            {}
          );
        }
      );
    },
    [boardSlug, queryClient]
  );
}
