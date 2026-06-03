import { SBoard } from 'entities/board';
import { z } from 'zod/v4';

export const CreateBoardFormSchema = SBoard.CreateBoardBody.extend({
  position: z.union([z.string(), z.number()]).transform(Number),
});
