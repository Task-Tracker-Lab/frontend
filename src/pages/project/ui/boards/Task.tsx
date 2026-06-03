import React, { ComponentProps } from 'react';
import { KanbanItem, KanbanItemHandle } from 'shared/ui';
import { TaskCard } from './TaskCard';
import { TTask } from 'entities/task/';

interface TaskCardProps extends Omit<ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: TTask.Task;
  asHandle?: boolean;
  isOverlay?: boolean;
}

export function TaskComponent({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle && !isOverlay ? (
        <KanbanItemHandle>{<TaskCard task={task} />}</KanbanItemHandle>
      ) : (
        <TaskCard task={task} />
      )}
    </KanbanItem>
  );
}

export const Task = React.memo(TaskComponent);
