import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UpdateMemberVariables = { userId: string } & TTeam.UpdateMemberBody;

type UseUpdateMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, UpdateMemberVariables>,
  'mutationFn'
>;

export function useUpdateMember({ onSuccess, ...rest }: UseUpdateMemberOptions = {}) {
  const teamId = useTeamStore.use.teamId();

  return useMutation<TTeam.ActionResponse, DefaultError, UpdateMemberVariables>({
    ...rest,
    mutationFn: ({ userId, ...data }) => {
      if (!teamId) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.updateMember(teamId, userId, data);
    },
    onSuccess: async (res, v, r, context) => {
      onSuccess?.(res, v, r, context);
      toast.success(res.message ?? 'Данные участника обновлены');

      if (teamId) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.members(teamId) });
      }
    },
  });
}
