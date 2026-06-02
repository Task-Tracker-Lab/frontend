import { BoardColumnResponse, BoardResponse } from './types';

// TODO: добавить таски в типы, когда они появятся в API

export type BoardWithTasks = {
  board: BoardResponse;
  columns: Record<string, BoardColumnResponse>;
  tasksByColumn: Record<string, unknown[]>;
};

export class BoardMapper {
  static toBoardWithTasks(board: BoardResponse): BoardWithTasks {
    const sortedColumns = [...board.boardColumns].sort((a, b) => a.position - b.position);
    const tasksByColumn: Record<string, unknown[]> = {};
    const columns: Record<string, BoardColumnResponse> = {};

    sortedColumns.forEach((column) => {
      tasksByColumn[column.id] = [];
      columns[column.id] = column;
    });

    // tasks?.forEach((task) => {
    //   if (tasksByColumn[task.columnId]) {
    //     tasksByColumn[task.columnId].push(task);
    //   } else {
    //     console.warn(`Task ${task.id} references unknown column ${task.columnId}`);
    //   }
    // });

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
