import { api } from 'shared/api';
import * as STask from '../model/schemas';
import * as TTask from '../model/types';

export class TaskHttp {
  static getTasks(query: TTask.TaskListQuery, signal?: AbortSignal) {
    return api<TTask.TaskListResponse>({
      url: '/issues',
      method: 'GET',
      params: query,
      contracts: {
        params: STask.TaskListQuery,
        response: STask.TaskListResponse,
      },
      signal,
    });
  }

  static getTask(id: string, query: TTask.TaskContextQuery, signal?: AbortSignal) {
    return api<TTask.TaskResponse>({
      url: `/issues/${id}`,
      method: 'GET',
      params: query,
      contracts: {
        response: STask.TaskResponse,
      },
      signal,
    });
  }

  static createTask(query: TTask.TaskContextQuery, data: TTask.CreateTaskBody) {
    return api<TTask.CreateTaskResponse>({
      url: '/issues',
      method: 'POST',
      params: query,
      data,
      contracts: {
        body: STask.CreateTaskBody,
        response: STask.CreateTaskResponse,
      },
    });
  }

  static updateTask(id: string, query: TTask.TaskContextQuery, data: TTask.UpdateTaskBody) {
    return api<TTask.ActionResponse>({
      url: `/issues/${id}`,
      method: 'PATCH',
      params: query,
      data,
      contracts: {
        body: STask.UpdateTaskBody,
        response: STask.ActionResponse,
      },
    });
  }

  static removeTask(id: string, query: TTask.TaskContextQuery) {
    return api<void>({
      url: `/issues/${id}`,
      method: 'DELETE',
      params: query,
    });
  }

  static moveTask(query: TTask.TaskByIdContextQuery, data: TTask.MoveTaskBody) {
    return api<TTask.ActionResponse>({
      url: `/issues/${query.id}/move`,
      method: 'POST',
      params: query,
      data,
      contracts: {
        params: STask.TaskByIdContextQuery,
        body: STask.MoveTaskBody,
        response: STask.ActionResponse,
      },
    });
  }

  static assignTask(id: string, query: TTask.TaskContextQuery, data: TTask.AssignTaskBody) {
    return api<TTask.ActionResponse>({
      url: `/issues/${id}/assignee`,
      method: 'PUT',
      params: query,
      data,
      contracts: {
        body: STask.AssignTaskBody,
        response: STask.ActionResponse,
      },
    });
  }

  static restoreTask(id: string, query: TTask.TaskContextQuery) {
    return api<TTask.ActionResponse>({
      url: `/issues/${id}/restore`,
      method: 'POST',
      params: query,
      contracts: {
        response: STask.ActionResponse,
      },
    });
  }
}
