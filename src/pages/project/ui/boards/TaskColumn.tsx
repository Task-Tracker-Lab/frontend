import { GripVerticalIcon } from 'lucide-react';
import { MockBoard, MockBoardCard } from 'pages/project/model/boards-mock';
import { ComponentProps } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
} from 'shared/ui';
import { TaskCard } from './TaskCard';

interface TaskColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: MockBoardCard[];
  columnTitles: MockBoard['columnTitles'];
  isOverlay?: boolean;
}

export function TaskColumn({ value, tasks, columnTitles, isOverlay, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn value={value} {...props}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{columnTitles[value]}</span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle asChild>
            <Button size="icon-xs" variant="ghost">
              <GripVerticalIcon />
            </Button>
          </KanbanColumnHandle>
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  );
}
