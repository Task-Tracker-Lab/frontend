/* eslint-disable check-file/filename-naming-convention */
import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { type TTask } from 'entities/task';
import { TaskHttp } from 'entities/task';

type CreateTaskVariables = {
  body: TTask.CreateTaskBody;
};

export type UseCreateProjectOptions = Omit<
  UseMutationOptions<TTask.CreateTaskResponse, DefaultError, CreateTaskVariables>,
  'mutationFn'
>;

export function useCreateTask({ onSuccess, ...rest }: UseCreateProjectOptions = {}) {
  // TODO
  return useMutation<TTask.CreateTaskResponse, DefaultError, CreateTaskVariables>({
    ...rest,
    mutationFn: ({ body }) => TaskHttp.createTask(body),
    onMutate: (data, ctx) => {},
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
    },
  });
}
