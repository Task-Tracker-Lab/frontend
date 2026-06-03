import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, TBoard } from 'entities/board';
import { toast } from 'sonner';

type CreateBoardVariables = {
  projectId: string;
  body: TBoard.CreateBoardBody;
};

export type UseCreateBoardOptions = Omit<
  UseMutationOptions<TBoard.CreateBoardResponse, DefaultError, CreateBoardVariables>,
  'mutationFn'
>;

export function useCreateBoard({ onSuccess, ...rest }: UseCreateBoardOptions = {}) {
  return useMutation<TBoard.CreateBoardResponse, DefaultError, CreateBoardVariables>({
    ...rest,
    mutationFn: ({ projectId, body }) => BoardHttp.createBoard(projectId, body),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Доска создана');

      await context.client.invalidateQueries({
        queryKey: boardFabricKeys.list(variables.projectId),
      });
    },
  });
}
