import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UpdateInvitationVariables = { code: string } & TTeam.UpdateInvitationBody;

type UseUpdateInvitationOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, UpdateInvitationVariables>,
  'mutationFn'
>;

export function useUpdateInvitation({ onSuccess, ...rest }: UseUpdateInvitationOptions = {}) {
  const teamId = useTeamStore.use.teamId();

  return useMutation<TTeam.ActionResponse, DefaultError, UpdateInvitationVariables>({
    ...rest,
    mutationFn: ({ code, ...data }) => {
      if (!teamId) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.updateInvitation(teamId, code, data);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success('Роль в приглашении обновлена');

      if (teamId) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.invitations(teamId) });
      }
    },
  });
}
