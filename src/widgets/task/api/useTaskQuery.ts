import { useQuery } from '@tanstack/react-query';
import { TaskQueries } from 'entities/task';

type UseTaskQueryParams = {
  taskId: string;
  projectSlug: string;
  boardSlug: string;
  enabled?: boolean;
};

export function useTaskQuery({
  taskId,
  projectSlug,
  boardSlug,
  enabled = true,
}: UseTaskQueryParams) {
  return useQuery({
    ...TaskQueries.getTask(taskId, { slug: projectSlug, key: boardSlug }),
    enabled: enabled && Boolean(taskId),
  });
}
