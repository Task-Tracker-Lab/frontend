import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

export type UseRemoveMemberInvitationOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, string>,
  'mutationFn'
>;

export function useRemoveMemberInvitation({
  onSuccess,
  ...rest
}: UseRemoveMemberInvitationOptions = {}) {
  const teamId = useTeamStore.use.teamId();

  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: (code) => {
      if (!teamId) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.removeInvitation(teamId, code);
    },
    onSuccess: async (res, v, r, context) => {
      onSuccess?.(res, v, r, context);
      toast.success(res.message ?? 'Приглашение отозвано');

      if (teamId) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.invitations(teamId) });
      }
    },
  });
}
