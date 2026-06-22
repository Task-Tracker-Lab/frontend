import { DateTimeString, GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';

export const Task = z.object({
  id: z.string(),
  boardId: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assigneeId: z.string().optional(),
  assignee: z.object({
    name: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  dueDate: z.string().optional(),
  position: z.number(),
  createdAt: DateTimeString,
  updatedAt: DateTimeString,
});

export const CreateTaskBody = z.object({
  title: z.string().min(1).max(300),
  boardId: z.string(),
  columnId: z.string(),
});
export const CreateTaskResponse = GlobalSuccess;
