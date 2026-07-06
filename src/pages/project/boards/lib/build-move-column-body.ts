import { type TBoard } from 'entities/board';
import { calculateNewPosition } from 'entities/board';

export function buildMoveColumnBody(
  columns: Record<string, TBoard.BoardColumnResponse>,
  columnId: string,
  columnOrder: string[]
): TBoard.MoveBoardColumnBody {
  const orderedColumns = columnOrder.map((id) => columns[id]).filter(Boolean);
  const index = orderedColumns.findIndex((column) => column.id === columnId);

  const prevPosition = orderedColumns[index - 1]?.position ?? null;
  const nextPosition = orderedColumns[index + 1]?.position ?? null;

  return {
    position: calculateNewPosition(prevPosition, nextPosition),
    prevStatePosition: prevPosition,
    nextStatePosition: nextPosition,
  };
}
