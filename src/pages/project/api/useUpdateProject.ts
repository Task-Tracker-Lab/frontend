import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

type UseUpdateProjectProps = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, TProject.UpdateProjectBody>,
  'mutationFn'
>;

export function useUpdateProject({ onSuccess, ...rest }: UseUpdateProjectProps = {}) {
  const teamSlug = useTeamStore.use.slug();
  const params = useParams();
  const projectId = typeof params?.projectId === 'string' ? params.projectId : undefined;

  return useMutation<TProject.ActionResponse, DefaultError, TProject.UpdateProjectBody>({
    ...rest,
    mutationFn: (data) => {
      if (!teamSlug || !projectId) {
        throw new Error('Не выбран проект');
      }
      return ProjectHttp.updateProject(teamSlug, projectId, data);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Проект обновлён');

      if (teamSlug && projectId) {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: projectFabricKeys.detail(teamSlug, projectId),
          }),
          context.client.invalidateQueries({
            queryKey: projectFabricKeys.list(teamSlug),
          }),
        ]);
      }
    },
  });
}
