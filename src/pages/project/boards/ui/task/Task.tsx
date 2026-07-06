'use client';

import { TTask } from 'entities/task';
import React, { ComponentProps, useState } from 'react';
import { KanbanItem, KanbanItemHandle } from 'shared/ui';
import { useRouteParams } from 'shared/lib/hooks';
import { TaskCard } from './TaskCard';
import { TaskWidget } from './TaskWidget';

interface TaskProps extends Omit<ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: TTask.Task;
  asHandle?: boolean;
}

export function TaskComponent({ task, asHandle = true, ...props }: TaskProps) {
  const [open, setOpen] = useState(false);
  const { projectSlug, boardSlug } = useRouteParams();

  const handleOpen = () => setOpen(true);

  return (
    <>
      <KanbanItem value={task.id} {...props}>
        {asHandle ? (
          <KanbanItemHandle>
            <TaskCard task={task} onClick={handleOpen} />
          </KanbanItemHandle>
        ) : (
          <TaskCard task={task} onClick={handleOpen} />
        )}
      </KanbanItem>
      <TaskWidget
        taskId={task.id}
        taskTitle={task.title}
        projectSlug={projectSlug}
        boardSlug={boardSlug}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export const Task = React.memo(TaskComponent);
