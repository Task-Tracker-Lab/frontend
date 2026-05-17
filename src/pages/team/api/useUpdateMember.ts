import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { teamFabricKeys, TeamHttp, type TTeam, useTeamStore } from 'entities/team';
import { toast } from 'sonner';

type UpdateMemberVariables = { userId: string } & TTeam.UpdateMemberBody;

type UseUpdateMemberOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, UpdateMemberVariables>,
  'mutationFn'
>;

export function useUpdateMember({ onSuccess, ...rest }: UseUpdateMemberOptions = {}) {
  const slug = useTeamStore.use.slug();

  return useMutation<TTeam.ActionResponse, DefaultError, UpdateMemberVariables>({
    ...rest,
    mutationFn: ({ userId, ...data }) => {
      if (!slug) {
        throw new Error('Не выбрана команда');
      }
      return TeamHttp.updateMember(slug, userId, data);
    },
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Данные участника обновлены');

      if (slug) {
        await context.client.invalidateQueries({ queryKey: teamFabricKeys.members(slug) });
      }
    },
  });
}
