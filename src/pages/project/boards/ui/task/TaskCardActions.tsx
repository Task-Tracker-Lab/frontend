import { RemoveTaskDialog } from 'features/task/remove';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';
import { useRouteParams } from 'shared/lib/hooks';

interface TaskCardActionsProps {
  taskId: string;
  taskTitle: string;
}

export function TaskCardActions({ taskId, taskTitle }: TaskCardActionsProps) {
  const { projectSlug, boardSlug } = useRouteParams();

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            className="shrink-0"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuGroup>
            <RemoveTaskDialog
              slug={projectSlug}
              boardSlug={boardSlug}
              taskId={taskId}
              taskTitle={taskTitle}
              asChild
            >
              <DropdownMenuItem onSelect={(event) => event.preventDefault()} variant="destructive">
                <Trash2 className="size-4" />
                Удалить задачу
              </DropdownMenuItem>
            </RemoveTaskDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
