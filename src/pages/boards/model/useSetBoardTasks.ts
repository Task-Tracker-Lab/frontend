import { useQueryClient } from '@tanstack/react-query';
import { taskFabricKeys, TTask } from 'entities/task';
import { useCallback } from 'react';
import { tasksByColumnToList } from './tasks-by-column-to-list';

export function useSetBoardTasks(projectSlug: string, boardSlug: string) {
  const queryClient = useQueryClient();

  return useCallback(
    (value: Record<string, TTask.Task[]>) => {
      const queryKey = taskFabricKeys.list(projectSlug, boardSlug);

      queryClient.setQueriesData<TTask.TaskListResponse>({ queryKey }, () =>
        tasksByColumnToList(value)
      );
    },
    [boardSlug, projectSlug, queryClient]
  );
}
