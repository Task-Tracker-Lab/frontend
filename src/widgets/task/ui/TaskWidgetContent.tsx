'use client';

import { type TTask } from 'entities/task';
import { useUpdateTask } from 'features/task/update';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { formatDate } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  ScrollArea,
  Separator,
  Textarea,
} from 'shared/ui';
import { useTaskQuery } from '../api/useTaskQuery';
import { taskPriorityMap } from '../config/task-meta-map';
import { TaskWidgetFallback } from './TaskWidgetFallback';

interface TaskWidgetContentProps {
  taskId: string;
  projectSlug: string;
  boardSlug: string;
}

function TaskDetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

interface TaskDescriptionProps {
  task: TTask.Task;
  projectSlug: string;
  boardSlug: string;
}

function TaskDescription({ task, projectSlug, boardSlug }: TaskDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  const handleEdit = useCallback(() => {
    setDescription(task.description ?? '');
    setIsEditing(true);
  }, [task.description]);

  const handleSave = useCallback(async () => {
    const descriptionValue = description.trim();

    setIsEditing(false);

    if (descriptionValue === (task.description ?? '')) {
      return;
    }

    await updateTask({
      slug: projectSlug,
      boardSlug,
      taskId: task.id,
      body: { description: descriptionValue || null },
    });
  }, [boardSlug, description, projectSlug, task.description, task.id, updateTask]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <Textarea
          autoFocus
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      ) : task.description ? (
        <p className="whitespace-pre-wrap">{task.description}</p>
      ) : (
        <p className="text-muted-foreground">Без описания</p>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" size="sm" disabled={isPending} onClick={handleSave}>
              Сохранить
            </Button>
            <Button variant="ghost" size="sm" disabled={isPending} onClick={handleCancel}>
              Отменить
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={handleEdit}>
            Редактировать описание
          </Button>
        )}
      </div>
    </div>
  );
}

export function TaskWidgetContent({ taskId, projectSlug, boardSlug }: TaskWidgetContentProps) {
  const { data: task, isPending } = useTaskQuery({
    taskId,
    projectSlug,
    boardSlug,
  });

  if (isPending || !task) {
    return <TaskWidgetFallback />;
  }

  const priority = taskPriorityMap[task.priority];

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-5 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={priority.variant}>{priority.label}</Badge>
          {task.labels.map((label) => (
            <Badge key={label} variant="secondary">
              {label}
            </Badge>
          ))}
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <TaskDetailRow label="Исполнитель">
            {task.assignee ? (
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={task.assignee.avatarUrl ?? undefined} />
                  <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{task.assignee.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Не назначен</span>
            )}
          </TaskDetailRow>

          <TaskDetailRow label="Автор">
            {task.reporter ? (
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={task.reporter.avatarUrl ?? undefined} />
                  <AvatarFallback>{task.reporter.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{task.reporter.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </TaskDetailRow>

          <TaskDetailRow label="Срок">
            {task.dueDate ? (
              formatDate(task.dueDate)
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </TaskDetailRow>

          <TaskDetailRow label="Story points">
            {task.storyPoints ?? <span className="text-muted-foreground">—</span>}
          </TaskDetailRow>

          {task.parent?.title && (
            <TaskDetailRow label="Родительская задача">{task.parent.title}</TaskDetailRow>
          )}
        </div>

        <Separator />

        <TaskDetailRow label="Описание">
          <TaskDescription task={task} projectSlug={projectSlug} boardSlug={boardSlug} />
        </TaskDetailRow>

        <Separator />

        <div className="text-muted-foreground grid gap-2 text-xs">
          <span>Создана: {formatDate(task.createdAt)}</span>
          <span>Обновлена: {formatDate(task.updatedAt)}</span>
        </div>
      </div>
    </ScrollArea>
  );
}
