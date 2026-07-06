import { type TTask } from 'entities/task';
import { calculateNewPosition } from 'entities/board';

export function tasksByColumnToList(
  value: Record<string, TTask.Task[]>,
  draggedTaskId?: string
): TTask.TaskListResponse {
  return Object.entries(value).flatMap(([stateId, tasks]) =>
    tasks.map((task, index, array) => ({
      ...task,
      stateId,
      position:
        draggedTaskId === task.id
          ? calculateNewPosition(
              array[index - 1]?.position ?? null,
              array[index + 1]?.position ?? null
            )
          : task.position,
    }))
  );
}
