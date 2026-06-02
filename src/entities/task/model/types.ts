import { z } from 'zod/v4';
import * as STask from './schemas';

export type Task = z.infer<typeof STask.Task>;

export type CreateTaskBody = z.infer<typeof STask.CreateTaskBody>;

export type CreateTaskResponse = Task;
