import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type CreateProjectVariables = {
  teamSlug: string;
  body: TProject.CreateProjectBody;
};

export type UseCreateProjectOptions = Omit<
  UseMutationOptions<TProject.CreateProjectResponse, DefaultError, CreateProjectVariables>,
  'mutationFn'
>;

export function useCreateProject({ onSuccess, ...rest }: UseCreateProjectOptions = {}) {
  return useMutation<TProject.CreateProjectResponse, DefaultError, CreateProjectVariables>({
    ...rest,
    mutationFn: ({ teamSlug, body }) => ProjectHttp.createProject(teamSlug, body),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Проект создан');

      await context.client.invalidateQueries({
        queryKey: projectFabricKeys.list(variables.teamSlug),
      });
    },
  });
}
