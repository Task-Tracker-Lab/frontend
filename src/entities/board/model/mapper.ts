import { BoardColumnResponse, BoardResponse } from './types';

// TODO: добавить таски в типы, когда они появятся в API

export type BoardWithTasks = {
  board: BoardResponse;
  columns: BoardColumnResponse[];
  tasksByColumn: Record<string, unknown[]>;
  columnTitles: Record<string, string>;
};

export class BoardMapper {
  static toBoardWithTasks(board: BoardResponse): BoardWithTasks {
    const sortedColumns = [...board.boardColumns].sort((a, b) => a.position - b.position);
    const columnTitles: Record<string, string> = {};
    const tasksByColumn: Record<string, unknown[]> = {};

    sortedColumns.forEach((column) => {
      tasksByColumn[column.id] = [];
      columnTitles[column.id] = column.name;
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
      columnTitles,
      columns: sortedColumns,
      tasksByColumn,
    };
  }
}
