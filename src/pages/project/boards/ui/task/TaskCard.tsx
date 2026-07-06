import { TTask } from 'entities/task';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  Checkbox,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'shared/ui';
import { TaskCardActions } from './TaskCardActions';
import { TaskCardTitle } from './TaskCardTitle';

interface TaskCardProps {
  task: TTask.Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card className="group cursor-pointer p-2.5" onClick={onClick}>
      <CardContent className="space-y-2.5 p-0">
        <div className="flex items-start gap-1">
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="p-1" onClick={(event) => event.stopPropagation()}>
                  <Checkbox classNameInput="rounded-full" />
                </Label>
              </TooltipTrigger>
              <TooltipContent side="top">Отметить задачу выполненной</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="min-w-0 flex-1">
            <TaskCardTitle task={task} />
          </div>
          <TaskCardActions taskId={task.id} taskTitle={task.title} />
          <div className="text-muted-foreground text-xs">{task.position}</div>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="size-6">
                    <AvatarImage src={task.assignee.avatarUrl ?? undefined} />
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
                task.priority === 'critical' || task.priority === 'high'
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
