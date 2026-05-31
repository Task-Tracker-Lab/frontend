import { Ellipsis, GripVertical, Plus } from 'lucide-react';
import { MockBoard, MockBoardTask } from 'pages/project/model/boards-mock';
import React, { ComponentProps } from 'react';
import { Button, KanbanColumn, KanbanColumnContent, KanbanColumnHandle } from 'shared/ui';

// TODO: вынести функцию и иконки в shared или сделать свои
import { projectIconCodeToEmoji } from 'entities/project';
import { Task } from './Task';

interface TaskColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: MockBoardTask[];
  columnTitles: MockBoard['columnTitles'];
  isOverlay?: boolean;
}

interface TaskColumnHeaderProps {
  title: string;
  icon?: string;
  tasksLength: number;
}

export function TaskColumn({
  value,
  tasks,
  columnTitles,
  className,
  isOverlay,
  ...props
}: TaskColumnProps) {
  const headerColumnData: TaskColumnHeaderProps = {
    title: columnTitles[value].title,
    icon: projectIconCodeToEmoji(columnTitles[value].icon),
    tasksLength: tasks.length,
  };

  return (
    <KanbanColumn value={value} className={`h-full min-w-[300px] gap-2.5 ${className}`} {...props}>
      <TaskColumnHeader data={headerColumnData} />

      <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <Task key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
        ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}

function _TaskColumnHeader({ data }: { data: TaskColumnHeaderProps }) {
  const { tasksLength, title, icon } = data;
  return (
    <KanbanColumnHandle variant="visible" cursor={false} asChild>
      <div className="flex h-[40px] items-center justify-between rounded-xl bg-gray-100 px-2.5">
        <div className="flex items-center gap-2.5">
          {icon && <span>{icon}</span>}
          <h2 className="text-muted-foreground flex gap-1 text-sm">
            <span className="font-medium">{title}</span>
            <span>({tasksLength})</span>
          </h2>
        </div>
        <div className="flex items-center">
          {/* TODO: добавить dialog/popover */}
          <Button size={'icon-sm'} variant={'ghost'}>
            <Plus />
          </Button>
          {/* TODO: добавить dialog/popover */}
          <Button size={'icon-sm'} variant={'ghost'}>
            <Ellipsis />
          </Button>
        </div>
      </div>
    </KanbanColumnHandle>
  );
}

const TaskColumnHeader = React.memo(_TaskColumnHeader);
