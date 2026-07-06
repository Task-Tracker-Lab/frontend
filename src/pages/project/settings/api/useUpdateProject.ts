import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UseUpdateProjectProps = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, TProject.UpdateProjectBody>,
  'mutationFn'
> & { slug: string };

export function useUpdateProject({ onSuccess, slug, ...rest }: UseUpdateProjectProps) {
  const teamId = useTeamStore.use.teamId();

  return useMutation<TProject.ActionResponse, DefaultError, TProject.UpdateProjectBody>({
    ...rest,
    mutationFn: (data) => {
      if (!teamId || !slug) {
        throw new Error('Не выбран проект');
      }
      return ProjectHttp.updateProject(teamId, slug, data);
    },
    onSuccess: async (res, v, r, context) => {
      onSuccess?.(res, v, r, context);
      toast.success(res.message ?? 'Проект обновлён');

      if (teamId && slug) {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: projectFabricKeys.detail(teamId, slug),
          }),
          context.client.invalidateQueries({
            queryKey: projectFabricKeys.list(teamId),
          }),
        ]);
      }
    },
  });
}
