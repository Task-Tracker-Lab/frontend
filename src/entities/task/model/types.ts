import { z } from 'zod/v4';
import * as STask from './schemas';

export type Task = z.infer<typeof STask.Task>;
export type TaskResponse = z.infer<typeof STask.TaskResponse>;
export type TaskListResponse = z.infer<typeof STask.TaskListResponse>;

export type CreateTaskBody = z.infer<typeof STask.CreateTaskBody>;
export type UpdateTaskBody = z.infer<typeof STask.UpdateTaskBody>;
export type MoveTaskBody = z.infer<typeof STask.MoveTaskBody>;
export type AssignTaskBody = z.infer<typeof STask.AssignTaskBody>;
export type TaskContextQuery = z.infer<typeof STask.TaskContextQuery>;
export type TaskByIdContextQuery = z.infer<typeof STask.TaskByIdContextQuery>;
export type TaskListQuery = z.infer<typeof STask.TaskListQuery>;

export type CreateTaskResponse = z.infer<typeof STask.CreateTaskResponse>;
export type ActionResponse = z.infer<typeof STask.ActionResponse>;
export type IssuePriority = z.infer<typeof STask.IssuePriority>;
export type IssueType = z.infer<typeof STask.IssueType>;
