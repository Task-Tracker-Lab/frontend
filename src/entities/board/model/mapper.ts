import type { BoardColumnResponse, BoardResponse } from './types';

// TODO: добавить таски в типы, когда они появятся в API

type KanbanTaskStub = {
  id: string;
  columnId: string;
};

export type KanbanBoardData = {
  board: BoardResponse;
  columns: Record<string, BoardColumnResponse>;
  tasksByColumn: Record<string, unknown[]>;
};

export class BoardMapper {
  static toKanban(
    board: BoardResponse,
    columnList: BoardColumnResponse[],
    taskList: unknown[]
  ): KanbanBoardData {
    const sortedColumns = [...columnList].sort((a, b) => a.position - b.position);
    const tasksByColumn: Record<string, unknown[]> = {};
    const columns: Record<string, BoardColumnResponse> = {};

    sortedColumns.forEach((column) => {
      tasksByColumn[column.id] = [];
      columns[column.id] = column;
    });

    taskList?.forEach((task) => {
      const kanbanTask = task as KanbanTaskStub;

      if (tasksByColumn[kanbanTask.columnId]) {
        tasksByColumn[kanbanTask.columnId].push(task);
      } else {
        console.warn(`Task ${kanbanTask.id} references unknown column ${kanbanTask.columnId}`);
      }
    });

    // Object.keys(tasksByColumn).forEach((columnId) => {
    //   tasksByColumn[columnId].sort((a, b) => a.position - b.position);
    // });

    return {
      board,
      columns,
      tasksByColumn,
    };
  }
}
