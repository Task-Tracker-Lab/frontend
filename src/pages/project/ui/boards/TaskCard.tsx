import { MockBoardTask } from 'pages/project/model/boards-mock';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Label,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Checkbox,
  Badge,
} from 'shared/ui';

interface TaskCardProps {
  task: MockBoardTask;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex items-start gap-1">
          <Label className="p-1">
            <Checkbox />
          </Label>
          <div>
            <h3 className="text-foreground line-clamp-1 font-medium">{task.name}</h3>
            <span className="text-muted-foreground line-clamp-1 text-sm">{task.description}</span>
          </div>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="size-6">
                    <AvatarImage src={task.assignee.avatarUrl} />
                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{task.assignee.name}</TooltipContent>
              </Tooltip>
              {task.dueDate && (
                <time className="whitespace-nowrap tabular-nums">{task.dueDate}</time>
              )}
            </div>
          )}
          {task.priority && (
            <Badge
              variant={
                task.priority === 'high'
                  ? 'destructive'
                  : task.priority === 'medium'
                    ? 'secondary'
                    : 'default'
              }
            >
              {task.priority}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
