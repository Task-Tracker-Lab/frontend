import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { taskFabricKeys, TaskHttp, type TTask } from 'entities/task';

type CreateTaskVariables = {
  slug: string;
  key: string;
  body: TTask.CreateTaskBody;
};

type OptimisticContext = {
  previous: Array<[readonly unknown[], TTask.TaskListResponse | undefined]>;
};

export type UseCreateProjectOptions = Omit<
  UseMutationOptions<
    TTask.CreateTaskResponse,
    DefaultError,
    CreateTaskVariables,
    OptimisticContext
  >,
  'mutationFn' | 'onMutate'
>;

export function useCreateTask({ onSettled, onError, ...options }: UseCreateProjectOptions = {}) {
  return useMutation<
    TTask.CreateTaskResponse,
    DefaultError,
    CreateTaskVariables,
    OptimisticContext
  >({
    ...options,
    mutationFn: ({ slug, key, body }) => TaskHttp.createTask({ slug, key }, body),
    onMutate: async (variables, context) => {
      const queryKey = taskFabricKeys.list(variables.slug, variables.key);
      const now = new Date().toISOString();
      const optimisticTask: TTask.Task = {
        id: `tmp-${crypto.randomUUID()}`,
        title: variables.body.title,
        description: variables.body.description ?? null,
        descriptionHtml: variables.body.descriptionHtml ?? null,
        priority: variables.body.priority ?? 'medium',
        type: variables.body.type ?? 'task',
        areaId: '',
        stateId: variables.body.stateId ?? null,
        position: variables.body.position ?? 0,
        assigneeId: variables.body.assigneeId ?? null,
        assignee: null,
        reporterId: variables.body.reporterId ?? null,
        reporter: null,
        parentId: variables.body.parentId ?? null,
        parent: null,
        labels: variables.body.labels ?? [],
        storyPoints: variables.body.storyPoints ?? null,
        dueDate: variables.body.dueDate ?? null,
        createdAt: now,
        updatedAt: now,
        createdBy: null,
        deletedAt: null,
      };

      await context.client.cancelQueries({ queryKey });

      const previous = context.client.getQueriesData<TTask.TaskListResponse>({ queryKey });

      if (previous) {
        context.client.setQueriesData<TTask.TaskListResponse>({ queryKey }, (old = []) => [
          optimisticTask,
          ...old,
        ]);
      }

      return { previous };
    },
    onError: (error, variables, onMutateResult, context) => {
      onError?.(error, variables, onMutateResult, context);
      if (!onMutateResult?.previous?.length) {
        return;
      }

      onMutateResult.previous.forEach(
        ([key, data]: [readonly unknown[], TTask.TaskListResponse | undefined]) => {
          context.client.setQueryData(key, data);
        }
      );
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      onSettled?.(data, error, variables, onMutateResult, context);
      context?.client.invalidateQueries({
        queryKey: taskFabricKeys.list(variables.slug, variables.key),
      });
    },
  });
}
