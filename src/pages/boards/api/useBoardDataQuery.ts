import { useSuspenseQueries } from '@tanstack/react-query';
import { BoardQueries } from 'entities/board';
import { TaskQueries, TTask } from 'entities/task';

export function useBoardDataQuery(projectSlug: string, boardSlug: string) {
  return useSuspenseQueries({
    queries: [
      BoardQueries.getBoardColumnList(boardSlug),
      TaskQueries.getTasks({ slug: projectSlug, key: boardSlug }),
    ],
    combine: (results) => {
      const columns = results[0].data;
      const tasksByColumn = results[1].data;

      return Object.values(columns).reduce<Record<string, TTask.Task[]>>((acc, column) => {
        acc[column.id] = tasksByColumn[column.id]?.sort((a, b) => a.position - b.position) ?? [];

        return acc;
      }, {});
    },
  });
}

export { useBoardDataQuery as useBoardData };
