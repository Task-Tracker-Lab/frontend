import { TTask } from 'entities/task';

export function tasksByColumnToList(value: Record<string, TTask.Task[]>): TTask.TaskListResponse {
  return Object.entries(value).flatMap(([stateId, tasks]) =>
    tasks.map((task, position) => ({
      ...task,
      stateId,
      position,
    }))
  );
}
