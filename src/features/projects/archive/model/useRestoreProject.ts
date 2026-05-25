import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type RestoreProjectVariables = {
  teamSlug: string;
  id: string;
};

export type UseRestoreProjectOptions = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, RestoreProjectVariables>,
  'mutationFn'
>;

export function useRestoreProject({ onSuccess, ...rest }: UseRestoreProjectOptions = {}) {
  return useMutation<TProject.ActionResponse, DefaultError, RestoreProjectVariables>({
    ...rest,
    mutationFn: ({ teamSlug, id }) => ProjectHttp.updateProject(teamSlug, id, { status: 'active' }),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Проект восстановлен');

      await Promise.all([
        context.client.invalidateQueries({
          queryKey: projectFabricKeys.list(variables.teamSlug),
        }),
        context.client.invalidateQueries({
          queryKey: projectFabricKeys.detail(variables.teamSlug, variables.id),
        }),
      ]);
    },
  });
}
