'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { TaskQueries } from 'entities/task';
import { CalendarDays, CircleDot, FileText, GitBranch, Hash, User, UserPen } from 'lucide-react';
import { formatDate } from 'shared/lib/utils';
import { Badge, ScrollArea, Separator } from 'shared/ui';
import { taskPriorityMap } from '../config/task-meta-map';
import { TaskDescription } from './TaskDescription';
import { TaskDetailRow } from './TaskDetailRow';
import { TaskMember } from './TaskMember';

interface TaskContentProps {
  taskId: string;
  projectSlug: string;
  boardSlug: string;
}

export function TaskContent({ taskId, projectSlug, boardSlug }: TaskContentProps) {
  const { data: task } = useSuspenseQuery(
    TaskQueries.getTask(taskId, { slug: projectSlug, key: boardSlug })
  );

  const priority = taskPriorityMap[task.priority];

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={priority.variant}>{priority.label}</Badge>
          {task.labels.map((label) => (
            <Badge key={label} variant="secondary">
              {label}
            </Badge>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <h2 className="text-sm font-medium">Описание</h2>
            </div>
            <div className="bg-muted/30 rounded-lg border p-4">
              <TaskDescription task={task} projectSlug={projectSlug} boardSlug={boardSlug} />
            </div>
          </section>

          <aside className="space-y-3">
            <div className="flex items-center gap-2">
              <CircleDot className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <h2 className="text-sm font-medium">Детали</h2>
            </div>
            <div className="divide-border divide-y overflow-hidden rounded-lg border">
              <TaskDetailRow label="Исполнитель" icon={User}>
                {task.assignee ? (
                  <TaskMember name={task.assignee.name} avatarUrl={task.assignee.avatarUrl} />
                ) : (
                  <span className="text-muted-foreground">Не назначен</span>
                )}
              </TaskDetailRow>

              <TaskDetailRow label="Автор" icon={UserPen}>
                {task.reporter ? (
                  <TaskMember name={task.reporter.name} avatarUrl={task.reporter.avatarUrl} />
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TaskDetailRow>

              <TaskDetailRow label="Срок" icon={CalendarDays}>
                {task.dueDate ? (
                  <time className="tabular-nums">{formatDate(task.dueDate)}</time>
                ) : (
                  <span className="text-muted-foreground">Не указан</span>
                )}
              </TaskDetailRow>

              <TaskDetailRow label="Story points" icon={Hash}>
                {task.storyPoints ?? <span className="text-muted-foreground">—</span>}
              </TaskDetailRow>

              {task.parent?.title ? (
                <TaskDetailRow label="Родительская задача" icon={GitBranch}>
                  <span className="line-clamp-2">{task.parent.title}</span>
                </TaskDetailRow>
              ) : null}
            </div>
          </aside>
        </div>

        <Separator />

        <footer className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <span>Создана {formatDate(task.createdAt)}</span>
          <span aria-hidden>·</span>
          <span>Обновлена {formatDate(task.updatedAt)}</span>
        </footer>
      </div>
    </ScrollArea>
  );
}
