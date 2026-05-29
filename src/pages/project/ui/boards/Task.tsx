import { MockBoardTask } from 'pages/project/model/boards-mock';
import { ComponentProps } from 'react';
import { KanbanItem, KanbanItemHandle } from 'shared/ui';
import { TaskCard } from './TaskCard';

interface TaskCardProps extends Omit<ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: MockBoardTask;
  asHandle?: boolean;
  isOverlay?: boolean;
}

export function Task({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
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
