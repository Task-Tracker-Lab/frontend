import { SBoard } from 'entities/board';
import { z } from 'zod/v4';

export const CreateBoardColumnFormSchema = SBoard.CreateBoardColumnBody.extend({
  position: z.union([z.string(), z.number()]).transform(Number),
  color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
});
