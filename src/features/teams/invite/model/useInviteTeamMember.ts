import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam } from 'entities/team';
import { toast } from 'sonner';

export type InviteTeamMemberVariables = { teamId: string; body: TTeam.InviteMemberBody };

export type UseInviteTeamMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, InviteTeamMemberVariables>,
  'mutationFn'
>;

export function useInviteTeamMember({ onSuccess, ...rest }: UseInviteTeamMemberOptions = {}) {
  return useMutation<TTeam.ActionResponse, DefaultError, InviteTeamMemberVariables>({
    ...rest,
    mutationFn: ({ teamId, body }) => TeamHttp.inviteMember(teamId, body),
    onSuccess: async (res, variables, r, context) => {
      onSuccess?.(res, variables, r, context);
      toast.success(res.message ?? 'Приглашение отправлено');

      if (variables.teamId) {
        await context.client.invalidateQueries({
          queryKey: teamFabricKeys.invitations(variables.teamId),
        });
      }
    },
  });
}
