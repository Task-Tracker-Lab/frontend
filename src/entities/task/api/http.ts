import { api } from 'shared/api';
import * as STask from '../model/schemas';
import * as TTask from '../model/types';

export class TaskHttp {
  static createTask(data: TTask.CreateTaskBody) {
    return api<TTask.CreateTaskResponse>({
      url: `/teams/projects/`,
      method: 'POST',
      data,
      contracts: {
        response: STask.CreateTaskResponse,
        body: STask.CreateTaskBody,
      },
    });
  }
}
