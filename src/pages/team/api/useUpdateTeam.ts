import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { userFabricKeys } from 'entities/user';
import { toast } from 'sonner';

type UseUpdateTeamProps = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, TTeam.UpdateTeamBody>,
  'mutationFn'
>;

export function useUpdateTeam({ onSuccess, ...rest }: UseUpdateTeamProps = {}) {
  const slug = useTeamStore.use.slug();
  const setSlug = useTeamStore.use.setSlug();

  return useMutation<TTeam.ActionResponse, DefaultError, TTeam.UpdateTeamBody>({
    ...rest,
    mutationFn: (data) => {
      if (!slug) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.updateTeam(slug, data);
    },
    onSuccess: async (res, v, _r, context) => {
      onSuccess?.(res, v, _r, context);
      toast.success(res.message ?? 'Данные команды обновлены');

      await Promise.all([
        context.client.invalidateQueries({
          queryKey: teamFabricKeys.bySlug(v.slug ?? slug!),
        }),
        context.client.invalidateQueries({
          queryKey: userFabricKeys.myTeams(),
        }),
      ]);

      if (v.slug) {
        setSlug(v.slug);
      }
    },
  });
}
