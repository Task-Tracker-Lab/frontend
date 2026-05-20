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
  const slug = useTeamStore.use.slug();

  return useMutation<TTeam.ActionResponse, DefaultError, string>({
    ...rest,
    mutationFn: (code) => {
      if (!slug) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.removeInvitation(slug, code);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Приглашение отозвано');

      if (slug) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.invitations(slug) });
      }
    },
  });
}
