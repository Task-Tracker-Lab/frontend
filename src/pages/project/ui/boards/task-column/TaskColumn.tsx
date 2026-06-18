import { KanbanColumn, KanbanColumnContent } from 'shared/ui';

import { Task } from '../Task';
import { CreateTaskField } from 'features/task/create';
import { useBoardStore } from '../../../model/store';
import { TBoard } from 'entities/board';
import { ComponentProps } from 'react';
import { TTask } from 'entities/task';
import { TaskColumnHeader, TaskColumnHeaderProps } from './TaskColumnHeader';

interface TaskColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: TTask.Task[];
  column: TBoard.BoardColumnResponse;
  isOverlay?: boolean;
}

export function TaskColumn({
  value,
  tasks,
  column,
  className = '',
  isOverlay,
  ...props
}: TaskColumnProps) {
  const columnId = value;
  const boardSlug = useBoardStore((s) => s.activeBoardSlug!);
  const boardId = useBoardStore((s) => s.activeBoardId!);

  const headerColumnData: TaskColumnHeaderProps = {
    ...column,
    boardSlug,
    tasksLength: tasks.length,
  };

  return (
    <KanbanColumn
      value={columnId}
      className={`w-[250px] min-w-[250px] gap-2.5 ${className}`}
      {...props}
    >
      <TaskColumnHeader data={headerColumnData} />

      <KanbanColumnContent value={columnId} className="flex flex-col gap-2.5">
        <CreateTaskField columnId={columnId} boardId={boardId} />
        {tasks.map((task) => (
          <Task key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
        ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}
