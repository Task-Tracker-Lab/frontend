import { type DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { boardFabricKeys, BoardHttp, TBoard } from 'entities/board';
import { toast } from 'sonner';

type CreateBoardColumnVariables = {
  boardId: string;
  projectId: string;
  body: TBoard.CreateBoardColumnBody;
};

export type UseCreateBoardColumnOptions = Omit<
  UseMutationOptions<TBoard.CreateBoardColumnResponse, DefaultError, CreateBoardColumnVariables>,
  'mutationFn'
>;

export function useCreateBoardColumn({ onSuccess, ...rest }: UseCreateBoardColumnOptions = {}) {
  return useMutation<TBoard.CreateBoardColumnResponse, DefaultError, CreateBoardColumnVariables>({
    ...rest,
    mutationFn: ({ boardId, body }) => BoardHttp.createBoardColumn(boardId, body),
    onSuccess: async (res, variables, _r, context) => {
      onSuccess?.(res, variables, _r, context);
      toast.success(res.message ?? 'Колонка создана');

      await context.client.invalidateQueries({
        queryKey: boardFabricKeys.list(variables.projectId),
      });
      await context.client.invalidateQueries({
        queryKey: boardFabricKeys.columns(variables.boardId),
      });
    },
  });
}
