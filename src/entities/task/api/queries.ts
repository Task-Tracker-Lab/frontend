import { queryOptions } from '@tanstack/react-query';
import { taskFabricKeys } from '../model/const';
import type { Task, TaskContextQuery, TaskListQuery } from '../model/types';
import { TaskHttp } from './http';

export class TaskQueries {
  static getTasks(query: TaskListQuery) {
    return queryOptions({
      queryKey: taskFabricKeys.list(query.slug, query.key, query),
      queryFn: async ({ signal }) => TaskHttp.getTasks(query, signal),
      staleTime: 60_000,
      select: (data) => {
        return data.reduce<Record<string, Task[]>>((acc, task) => {
          if (!task.stateId) {
            return acc;
          }

          acc[task.stateId] = acc[task.stateId] ? [...acc[task.stateId], task] : [task];

          return acc;
        }, {});
      },
    });
  }

  static getTask(id: string, query: TaskContextQuery) {
    return queryOptions({
      queryKey: [...taskFabricKeys.detail(query.slug, query.key, id), query],
      queryFn: async ({ signal }) => TaskHttp.getTask(id, query, signal),
      staleTime: 60_000,
    });
  }
}
