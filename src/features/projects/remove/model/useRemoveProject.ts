import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type RemoveProjectVariables = {
  teamSlug: string;
  id: string;
};

export type UseRemoveProjectOptions = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, RemoveProjectVariables>,
  'mutationFn'
>;

export function useRemoveProject({ onSuccess, ...rest }: UseRemoveProjectOptions = {}) {
  return useMutation<TProject.ActionResponse, DefaultError, RemoveProjectVariables>({
    ...rest,
    mutationFn: ({ teamSlug, id }) => ProjectHttp.removeProject(teamSlug, id),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Проект удалён');

      await context.client.invalidateQueries({
        queryKey: projectFabricKeys.list(variables.teamSlug),
      });
    },
  });
}
