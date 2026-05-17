import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UseRemoveMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useRemoveMember({ onSuccess, ...rest }: UseRemoveMemberOptions = {}) {
  const slug = useTeamStore.use.slug();

  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: (userId) => {
      if (!slug) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.removeMember(slug, userId);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Участник удалён из команды');

      if (slug) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.members(slug) });
      }
    },
  });
}
