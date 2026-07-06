import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamHttp, type TTeam } from 'entities/team';
import { userFabricKeys } from 'entities/user';
import { toast } from 'sonner';

export type UseDeleteTeamOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useRemoveTeam({ onSuccess, onSettled, ...rest }: UseDeleteTeamOptions = {}) {
  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: TeamHttp.removeTeam,
    onSuccess: async (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Команда удалена');
    },
    onSettled: async (d, e, v, m, context) => {
      onSettled?.(d, e, v, m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.myTeams() });
    },
  });
}
