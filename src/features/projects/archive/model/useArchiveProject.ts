import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type ArchiveProjectVariables = {
  teamSlug: string;
  id: string;
};

export type UseArchiveProjectOptions = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, ArchiveProjectVariables>,
  'mutationFn'
>;

export function useArchiveProject({ onSuccess, ...rest }: UseArchiveProjectOptions = {}) {
  return useMutation<TProject.ActionResponse, DefaultError, ArchiveProjectVariables>({
    ...rest,
    mutationFn: ({ teamSlug, id }) => ProjectHttp.archiveProject(teamSlug, id),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Проект архивирован');

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
