import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { taskFabricKeys, TaskHttp, type TTask } from 'entities/task';
import { toast } from 'sonner';

export type UpdateTaskVariables = {
  slug: string;
  boardSlug: string;
  taskId: string;
  body: TTask.UpdateTaskBody;
};

type OptimisticContext = {
  previous: Array<[readonly unknown[], TTask.TaskListResponse | undefined]>;
};

export type UseUpdateTaskOptions = Omit<
  UseMutationOptions<TTask.ActionResponse, DefaultError, UpdateTaskVariables, OptimisticContext>,
  'mutationFn' | 'onMutate'
>;

export function useUpdateTask({ onSettled, onError, ...rest }: UseUpdateTaskOptions = {}) {
  return useMutation<TTask.ActionResponse, DefaultError, UpdateTaskVariables, OptimisticContext>({
    ...rest,
    mutationFn: ({ slug, boardSlug, taskId, body }) =>
      TaskHttp.updateTask(taskId, { slug, key: boardSlug }, body),
    onMutate: async (variables, context) => {
      const queryKey = taskFabricKeys.list(variables.slug, variables.boardSlug);

      await context.client.cancelQueries({ queryKey });

      const previous = context.client.getQueriesData<TTask.TaskListResponse>({ queryKey });

      context.client.setQueriesData<TTask.TaskListResponse>({ queryKey }, (old = []) =>
        old.map((task) =>
          task.id === variables.taskId
            ? {
                ...task,
                ...variables.body,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );

      return { previous };
    },
    onError: (error, variables, onMutateResult, context) => {
      onError?.(error, variables, onMutateResult, context);

      onMutateResult?.previous?.forEach(([key, data]) => {
        context.client.setQueryData(key, data);
      });

      toast.error(error.message ?? 'Не удалось обновить задачу');
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      onSettled?.(data, error, variables, onMutateResult, context);

      context?.client.invalidateQueries({
        queryKey: taskFabricKeys.list(variables.slug, variables.boardSlug),
      });
      context?.client.invalidateQueries({
        queryKey: taskFabricKeys.detail(variables.slug, variables.boardSlug, variables.taskId),
      });
    },
  });
}
