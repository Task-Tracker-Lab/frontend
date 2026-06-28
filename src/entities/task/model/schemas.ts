import { DateTimeString, GlobalSuccess } from 'shared/api';
import { z } from 'zod/v4';

export const IssuePriority = z.enum(['critical', 'low', 'medium', 'high']);
export const IssueType = z.enum(['bug', 'task', 'epic']);

export const IssueFilterPriority = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const IssueFilterType = z.enum(['TASK', 'BUG', 'EPIC']);
export const IssueSortBy = z.enum(['position']);
export const IssueSortOrder = z.enum(['asc', 'desc']);

export const IssueMember = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.email().optional(),
    avatarUrl: z.url().nullable().optional(),
  })
  .strict();

export const IssueParent = z
  .object({
    id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
  })
  .strict();

export const Task = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1).max(255),
    description: z.string().nullable().optional(),
    descriptionHtml: z.string().nullable().optional(),
    priority: IssuePriority,
    type: IssueType,
    areaId: z.string().min(1),
    stateId: z.string().nullable().optional(),
    position: z.number().int().nonnegative(),
    assigneeId: z.string().nullable().optional(),
    assignee: IssueMember.nullable(),
    reporterId: z.string().nullable().optional(),
    reporter: IssueMember.nullable().optional(),
    parentId: z.string().nullable().optional(),
    parent: IssueParent.nullable().optional(),
    labels: z.array(z.string().max(50)),
    storyPoints: z.number().int().min(0).max(10000).nullable().optional(),
    dueDate: DateTimeString.nullable().optional(),
    createdAt: DateTimeString,
    updatedAt: DateTimeString,
    createdBy: z.string().nullable().optional(),
    deletedAt: DateTimeString.nullable().optional(),
  })
  .strict();

export const TaskListResponse = Task.array();
export const TaskResponse = Task;

export const CreateTaskBody = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().nullable().optional(),
    descriptionHtml: z.string().nullable().optional(),
    priority: IssuePriority.optional(),
    type: IssueType.optional(),
    stateId: z.string().nullable().optional(),
    position: z.number().int().nonnegative().optional(),
    assigneeId: z.string().nullable().optional(),
    reporterId: z.string().nullable().optional(),
    parentId: z.string().nullable().optional(),
    labels: z.array(z.string().max(50)).optional(),
    storyPoints: z.number().int().min(0).max(10000).nullable().optional(),
    dueDate: DateTimeString.nullable().optional(),
  })
  .strict();

export const CreateTaskResponse = GlobalSuccess.extend({
  id: z.string(),
});

export const UpdateTaskBody = CreateTaskBody.partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'Необходимо передать хотя бы одно поле для обновления',
    abort: true,
  })
  .strict();

export const MoveTaskBody = z
  .object({
    targetAreaId: z.string().optional(),
    targetStateId: z.string().nullable().optional(),
    position: z.number().int().nonnegative(),
  })
  .strict();

export const AssignTaskBody = z
  .object({
    assigneeId: z.string().nullable(),
  })
  .strict();

export const TaskContextQuery = z
  .object({
    slug: z.string(),
    key: z.string(),
  })
  .strict();

export const TaskByIdContextQuery = TaskContextQuery.extend({
  id: z.string().min(1),
}).strict();

export const TaskListQuery = TaskContextQuery.extend({
  stateId: z.string().optional(),
  assigneeId: z.string().optional(),
  reporterId: z.string().optional(),
  priority: IssueFilterPriority.optional(),
  type: IssueFilterType.optional(),
  parentId: z.string().optional(),
  labels: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sortBy: IssueSortBy.optional(),
  sortOrder: IssueSortOrder.optional(),
  areaId: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().min(0).optional(),
  search: z.string().optional(),
}).strict();

export const ActionResponse = GlobalSuccess;
