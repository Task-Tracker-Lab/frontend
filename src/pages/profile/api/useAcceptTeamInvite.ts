import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamHttp, type TTeam } from 'entities/team';
import { userFabricKeys } from 'entities/user';
import { toast } from 'sonner';

type UseAcceptTeamInviteOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useAcceptTeamInvite(options: UseAcceptTeamInviteOptions = {}) {
  const { onSuccess, onSettled, ...rest } = options;

  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: TeamHttp.acceptInvitation,
    onSuccess: (res, ...args) => {
      onSuccess?.(res, ...args);
      toast.success(res.message ?? 'Приглашение принято');
    },
    onSettled: async (_d, _e, _v, _m, context) => {
      onSettled?.(_d, _e, _v, _m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.myTeams() });
      context.client.invalidateQueries({ queryKey: userFabricKeys.myInvites() });
    },
  });
}
