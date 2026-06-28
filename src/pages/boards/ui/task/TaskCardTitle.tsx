import { TTask } from 'entities/task';
import { useUpdateTask } from 'features/task/update';
import { Pencil } from 'lucide-react';
import { FocusEvent, useCallback, useRef, useState } from 'react';
import { Button, Textarea } from 'shared/ui';
import { useBoardParams } from '../../model/useBoardParams';
import { useInlineFieldKeyDown } from '../../model/useInlineFieldKeyDown';
import { useInlineFieldOutsidePointerDown } from '../../model/useInlineFieldOutsidePointerDown';

interface TaskCardTitleProps {
  task: TTask.Task;
}

export function TaskCardTitle({ task }: TaskCardTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const containerRef = useRef<HTMLDivElement>(null);
  const { projectSlug, boardSlug } = useBoardParams();
  const { mutateAsync: updateTask } = useUpdateTask();

  const resetDraft = useCallback(
    (nextIsEditing: boolean = false) => {
      setTitle(task.title);
      setIsEditing(nextIsEditing);
    },
    [task.title]
  );

  const handleSave = useCallback(async () => {
    const titleValue = title.trim();

    if (!titleValue) {
      resetDraft();
      return;
    }

    setIsEditing(false);

    if (titleValue === task.title) {
      return;
    }

    await updateTask({
      slug: projectSlug,
      boardSlug,
      taskId: task.id,
      body: { title: titleValue },
    });
  }, [boardSlug, projectSlug, resetDraft, task.id, task.title, title, updateTask]);

  const onKeyDown = useInlineFieldKeyDown({
    onCancel: resetDraft,
    onSubmit: handleSave,
  });

  useInlineFieldOutsidePointerDown({
    enabled: isEditing,
    containerRef,
    onOutsidePointerDown: handleSave,
  });

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    event.currentTarget.setSelectionRange(value.length, value.length);
  };

  if (isEditing) {
    return (
      <div ref={containerRef} onClick={(event) => event.stopPropagation()}>
        <Textarea
          autoFocus
          rows={1}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onPointerDown={(event) => event.stopPropagation()}
          className="text-foreground m-0 h-auto min-h-0 w-full resize-none overflow-y-hidden border-none py-1 pl-0 leading-4 font-medium focus-visible:ring-0"
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-0.5">
      <h3 className="text-foreground line-clamp-1 min-w-0 flex-1 flex-none font-medium">
        {task.title}
      </h3>
      <Button
        size="icon-sm"
        variant="ghost"
        className="size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(event) => {
          event.stopPropagation();
          setIsEditing(true);
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <Pencil className="size-3.5" />
      </Button>
    </div>
  );
}
