import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { taskFabricKeys, TaskHttp, type TTask } from 'entities/task';
import { toast } from 'sonner';

export type RemoveTaskVariables = {
  slug: string;
  boardSlug: string;
  taskId: string;
};

type OptimisticContext = {
  previous: Array<[readonly unknown[], TTask.TaskListResponse | undefined]>;
};

export type UseRemoveTaskOptions = Omit<
  UseMutationOptions<void, DefaultError, RemoveTaskVariables, OptimisticContext>,
  'mutationFn' | 'onMutate'
>;

export function useRemoveTask({
  onSuccess,
  onSettled,
  onError,
  ...rest
}: UseRemoveTaskOptions = {}) {
  return useMutation<void, DefaultError, RemoveTaskVariables, OptimisticContext>({
    ...rest,
    mutationFn: ({ slug, boardSlug, taskId }) =>
      TaskHttp.removeTask(taskId, { slug, key: boardSlug }),
    onMutate: async (variables, context) => {
      const queryKey = taskFabricKeys.list(variables.slug, variables.boardSlug);

      await context.client.cancelQueries({ queryKey });

      const previous = context.client.getQueriesData<TTask.TaskListResponse>({ queryKey });

      context.client.setQueriesData<TTask.TaskListResponse>({ queryKey }, (old = []) =>
        old.filter((task) => task.id !== variables.taskId)
      );

      return { previous };
    },
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success('Задача удалена');
    },
    onError: (error, variables, onMutateResult, context) => {
      onError?.(error, variables, onMutateResult, context);

      onMutateResult?.previous?.forEach(([key, data]) => {
        context.client.setQueryData(key, data);
      });

      toast.error(error.message ?? 'Не удалось удалить задачу');
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      onSettled?.(data, error, variables, onMutateResult, context);

      context?.client.invalidateQueries({
        queryKey: taskFabricKeys.list(variables.slug, variables.boardSlug),
      });
    },
  });
}
