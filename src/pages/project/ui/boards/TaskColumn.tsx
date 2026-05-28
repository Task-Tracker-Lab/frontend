import { GripVerticalIcon } from 'lucide-react';
import { MockBoard, MockBoardTask } from 'pages/project/model/boards-mock';
import { ComponentProps } from 'react';
import { Button, KanbanColumn, KanbanColumnContent, KanbanColumnHandle } from 'shared/ui';
import { TaskCard } from './TaskCard';

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
          <span className="text-muted-foreground text-sm font-semibold">
            {columnTitles[value]} ({tasks.length})
          </span>
        </div>
        <KanbanColumnHandle asChild>
          <Button size="icon-xs" variant="ghost">
            <GripVerticalIcon />
          </Button>
        </KanbanColumnHandle>
      </div>

      <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
        ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}
