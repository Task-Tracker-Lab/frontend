import { Ellipsis, GripVertical, Plus } from 'lucide-react';
import { MockBoard, MockBoardTask } from 'pages/project/model/boards-mock';
import { ComponentProps } from 'react';
import { Button, KanbanColumn, KanbanColumnContent, KanbanColumnHandle } from 'shared/ui';

// TODO: вынести функцию и иконки в shared или сделать свои
import { projectIconCodeToEmoji } from 'entities/project';
import { Task } from './Task';

interface TaskColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: MockBoardTask[];
  columnTitles: MockBoard['columnTitles'];
  isOverlay?: boolean;
}

export function TaskColumn({
  value,
  tasks,
  columnTitles,
  className,
  isOverlay,
  ...props
}: TaskColumnProps) {
  return (
    <KanbanColumn value={value} className={`gap-2.5 ${className}`} {...props}>
      <div className="flex h-[40px] items-center justify-between rounded-xl bg-gray-100 px-2.5">
        <div className="flex items-center gap-2.5">
          {columnTitles[value].icon && (
            <span>{projectIconCodeToEmoji(columnTitles[value].icon)}</span>
          )}
          <h2 className="text-muted-foreground text-sm font-semibold">
            {columnTitles[value].title} ({tasks.length})
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
          <KanbanColumnHandle asChild>
            <Button size="icon-sm" variant="ghost">
              <GripVertical />
            </Button>
          </KanbanColumnHandle>
        </div>
      </div>

      <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <Task key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
        ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}
