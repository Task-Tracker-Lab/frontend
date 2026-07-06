import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { taskFabricKeys, TaskHttp, type TTask } from 'entities/task';
import { toast } from 'sonner';

type MoveTaskVariables = {
  slug: string;
  key: string;
  taskId: string;
  body: TTask.MoveTaskBody;
};

export type UseMoveTaskOptions = Omit<
  UseMutationOptions<TTask.ActionResponse, DefaultError, MoveTaskVariables>,
  'mutationFn'
>;

export function useMoveTask({ onSettled, onError, ...options }: UseMoveTaskOptions = {}) {
  return useMutation<TTask.ActionResponse, DefaultError, MoveTaskVariables>({
    ...options,
    mutationFn: ({ slug, key, taskId, body }) => TaskHttp.moveTask({ id: taskId, slug, key }, body),
    onSettled: (data, error, variables, onMutateResult, context) => {
      onSettled?.(data, error, variables, onMutateResult, context);

      context?.client.invalidateQueries({
        queryKey: taskFabricKeys.list(variables.slug, variables.key),
      });
    },
    onError: (error, variables, onMutateResult, context) => {
      onError?.(error, variables, onMutateResult, context);
      toast.error(error.message ?? 'Не удалось переместить задачу');
    },
  });
}
