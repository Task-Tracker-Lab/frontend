import { type TTask } from 'entities/task';
import { calculateNewPosition } from 'entities/board';

export function buildMoveTaskBody(
  columns: Record<string, TTask.Task[]>,
  taskId: string,
  toContainer: string
): TTask.MoveTaskBody {
  const destinationTasks = columns[toContainer] ?? [];
  const index = destinationTasks.findIndex((task) => task.id === taskId);

  const prevPosition = destinationTasks[index - 1]?.position ?? null;
  const nextPosition = destinationTasks[index + 1]?.position ?? null;

  return {
    targetStateId: toContainer,
    position: calculateNewPosition(prevPosition, nextPosition), //хз почему это бэк не делает
    prevIssuePosition: prevPosition,
    nextIssuePosition: nextPosition,
  };
}
