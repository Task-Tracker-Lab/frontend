'use client';

import type { TTask } from 'entities/task';
import { useUpdateTask } from 'features/task/update';
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from 'shared/lib/utils';
import { Button, Textarea } from 'shared/ui';

interface TaskDescriptionProps {
  task: TTask.Task;
  projectSlug: string;
  boardSlug: string;
}

export function TaskDescription({ task, projectSlug, boardSlug }: TaskDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  const handleEdit = () => {
    setDescription(task.description ?? '');
    setIsEditing(true);
  };

  const handleSave = async () => {
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
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <Textarea
          autoFocus
          rows={6}
          value={description}
          placeholder="Добавьте описание задачи..."
          className="bg-background min-h-32 resize-y"
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" disabled={isPending} onClick={handleSave}>
            Сохранить
          </Button>
          <Button variant="ghost" size="sm" disabled={isPending} onClick={handleCancel}>
            <X className="size-4" aria-hidden />
            Отменить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group/desc space-y-3">
      <div
        className={cn(
          'text-sm leading-relaxed',
          !task.description && 'text-muted-foreground italic'
        )}
      >
        {task.description ? (
          <p className="whitespace-pre-wrap">{task.description}</p>
        ) : (
          <p>Описание не добавлено. Нажмите «Редактировать», чтобы добавить детали.</p>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="opacity-100 transition-opacity lg:opacity-0 lg:group-hover/desc:opacity-100 lg:focus-visible:opacity-100"
        onClick={handleEdit}
      >
        <Pencil className="size-3.5" aria-hidden />
        Редактировать
      </Button>
    </div>
  );
}
