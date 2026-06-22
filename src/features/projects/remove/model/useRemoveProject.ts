import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { useRouter, usePathname } from 'next/navigation';
import { routes } from 'shared/config';
import { toast } from 'sonner';

type RemoveProjectVariables = {
  teamId: string;
  slug: string;
};

export type UseRemoveProjectOptions = Omit<
  UseMutationOptions<TProject.ActionResponse, DefaultError, RemoveProjectVariables>,
  'mutationFn'
>;

export function useRemoveProject({ onSuccess, ...rest }: UseRemoveProjectOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<TProject.ActionResponse, DefaultError, RemoveProjectVariables>({
    ...rest,
    mutationFn: ({ teamId, slug }) => ProjectHttp.removeProject(teamId, slug),
    onSuccess: async (res, variables, r, context) => {
      onSuccess?.(res, variables, r, context);

      if (pathname !== routes.team.projects()) {
        router.replace(routes.team.projects());
      }

      toast.success(res.message ?? 'Проект удалён');

      await context.client.invalidateQueries({
        queryKey: projectFabricKeys.list(variables.teamId),
      });
    },
  });
}
