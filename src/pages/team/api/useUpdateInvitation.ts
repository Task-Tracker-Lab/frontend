import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UpdateInvitationVariables = { code: string } & TTeam.UpdateInvitationBody;

type UseUpdateInvitationOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, UpdateInvitationVariables>,
  'mutationFn'
>;

export function useUpdateInvitation({ onSuccess, ...rest }: UseUpdateInvitationOptions = {}) {
  const slug = useTeamStore.use.slug();

  return useMutation<TTeam.ActionResponse, DefaultError, UpdateInvitationVariables>({
    ...rest,
    mutationFn: ({ code, ...data }) => {
      if (!slug) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.updateInvitation(slug, code, data);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success('Роль в приглашении обновлена');

      if (slug) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.invitations(slug) });
      }
    },
  });
}
