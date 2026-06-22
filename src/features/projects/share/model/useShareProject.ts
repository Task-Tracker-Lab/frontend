import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { projectFabricKeys, ProjectHttp, type TProject } from 'entities/project';
import { toast } from 'sonner';

type ShareProjectVariables = {
  teamId: string;
  slug: string;
  body?: TProject.CreateShareTokenBody;
};

export type UseShareProjectOptions = Omit<
  UseMutationOptions<TProject.CreateShareTokenResponse, DefaultError, ShareProjectVariables>,
  'mutationFn'
>;

export function useShareProject({ onSuccess, ...rest }: UseShareProjectOptions = {}) {
  return useMutation<TProject.CreateShareTokenResponse, DefaultError, ShareProjectVariables>({
    ...rest,
    mutationFn: ({ teamId, slug, body = {} }) => ProjectHttp.createShareToken(teamId, slug, body),
    onSuccess: async (res, variables, r, context) => {
      onSuccess?.(res, variables, r, context);
      toast.success(res.message ?? 'Ссылка для доступа создана');

      await context.client.invalidateQueries({
        queryKey: projectFabricKeys.detail(variables.teamId, variables.slug),
      });
    },
  });
}
