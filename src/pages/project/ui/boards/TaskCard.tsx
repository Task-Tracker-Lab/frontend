import { MockBoardCard } from 'pages/project/model/boards-mock';
import { ComponentProps } from 'react';
import { Card, CardContent, KanbanItem, KanbanItemHandle } from 'shared/ui';

interface TaskCardProps extends Omit<ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: MockBoardCard;
  asHandle?: boolean;
  isOverlay?: boolean;
}

export function TaskCard({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
  const cardContent = (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-sm font-medium">{task.name}</span>
        </div>
      </CardContent>
    </Card>
  );
  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle && !isOverlay ? <KanbanItemHandle>{cardContent}</KanbanItemHandle> : cardContent}
    </KanbanItem>
  );
}
