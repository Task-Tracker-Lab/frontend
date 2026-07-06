import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type CreateProjectVariables = {
  teamId: string;
  body: TProject.CreateProjectBody;
};

export type UseCreateProjectOptions = Omit<
  UseMutationOptions<TProject.CreateProjectResponse, DefaultError, CreateProjectVariables>,
  'mutationFn'
>;

export function useCreateProject({ onSuccess, ...rest }: UseCreateProjectOptions = {}) {
  return useMutation<TProject.CreateProjectResponse, DefaultError, CreateProjectVariables>({
    ...rest,
    mutationFn: ({ teamId, body }) => ProjectHttp.createProject(teamId, body),
    onSuccess: async (res, variables, r, context) => {
      onSuccess?.(res, variables, r, context);
      toast.success(res.message ?? 'Проект создан');

      await context.client.invalidateQueries({
        queryKey: projectFabricKeys.list(variables.teamId),
      });
    },
  });
}
