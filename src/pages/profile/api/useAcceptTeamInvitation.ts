import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamHttp, type TTeam } from 'entities/team';
import { userFabricKeys } from 'entities/user';
import { toast } from 'sonner';

type UseAcceptTeamInvitationOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useAcceptTeamInvitation(options: UseAcceptTeamInvitationOptions = {}) {
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
      await Promise.all([
        context.client.invalidateQueries({ queryKey: userFabricKeys.myTeams() }),
        context.client.invalidateQueries({ queryKey: userFabricKeys.myInvitations() }),
      ]);
    },
  });
}
