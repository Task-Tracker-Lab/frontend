import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamHttp, type TTeam } from 'entities/team';
import { userFabricKeys } from 'entities/user';
import { toast } from 'sonner';

export type UseCreateTeamOptions = Omit<
  UseMutationOptions<TTeam.ActionResponse, DefaultError, TTeam.CreateTeamBody>,
  'mutationFn'
>;

export function useCreateTeam({ onSuccess, ...rest }: UseCreateTeamOptions = {}) {
  return useMutation<TTeam.ActionResponse, DefaultError, TTeam.CreateTeamBody>({
    ...rest,
    mutationFn: TeamHttp.createTeam,
    onSuccess: async (res, _v, _r, context) => {
      onSuccess?.(res, _v, _r, context);
      toast.success(res.message ?? 'Команда создана');
      await context.client.invalidateQueries({ queryKey: userFabricKeys.myTeams() });
    },
  });
}
