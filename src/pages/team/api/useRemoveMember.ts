import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UseRemoveMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useRemoveMember({ onSuccess, ...rest }: UseRemoveMemberOptions = {}) {
  const teamId = useTeamStore.use.teamId();

  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: (userId) => {
      if (!teamId) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.removeMember(teamId, userId);
    },
    onSuccess: async (res, v, r, context) => {
      onSuccess?.(res, v, r, context);
      toast.success(res.message ?? 'Участник удалён из команды');

      if (teamId) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.members(teamId) });
      }
    },
  });
}
