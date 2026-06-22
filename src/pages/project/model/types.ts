import { type TBoard } from 'entities/board';

export type ProjectBoardViewData = {
  board: TBoard.BoardResponse;
  columns: TBoard.BoardColumnResponse[];
  tasks: unknown[]; // TODO: заглушка, пока не тасок;
};
