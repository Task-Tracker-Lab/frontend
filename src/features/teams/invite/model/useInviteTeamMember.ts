import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

export type InviteTeamMemberVariables = { slug: string; body: TTeam.InviteMemberBody };

export type UseInviteTeamMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, InviteTeamMemberVariables>,
  'mutationFn'
>;

export function useInviteTeamMember({ onSuccess, ...rest }: UseInviteTeamMemberOptions = {}) {
  const slug = useTeamStore.use.slug();

  return useMutation<TTeam.ActionResponse, DefaultError, InviteTeamMemberVariables>({
    ...rest,
    mutationFn: ({ slug, body }) => TeamHttp.inviteMember(slug, body),
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Приглашение отправлено');

      if (slug) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.invitations(slug) });
      }
    },
  });
}
