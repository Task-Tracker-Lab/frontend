import { useCreateTask } from 'features/task/create';
import { PlusIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Button, Card, CardContent, Checkbox, Textarea } from 'shared/ui';
import { useInlineFieldKeyDown } from '../../model/useInlineFieldKeyDown';
import { useInlineFieldOutsidePointerDown } from '../../model/useInlineFieldOutsidePointerDown';

interface CreateTaskInlineProps {
  projectSlug: string;
  boardSlug: string;
  columnId: string;
}

export function CreateTaskInline({ projectSlug, boardSlug, columnId }: CreateTaskInlineProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const { mutateAsync: createTask } = useCreateTask();
  const containerRef = useRef<HTMLDivElement>(null);
  const resetDraft = (createMore: boolean = false) => {
    setTaskTitle('');
    setIsCreating(createMore);
  };

  const handleCreateTask = useCallback(
    async (createMore: boolean = false): Promise<void> => {
      const titleValue = taskTitle.trim();

      resetDraft(createMore);

      if (!titleValue) {
        return;
      }

      await createTask({
        slug: projectSlug,
        key: boardSlug,
        body: {
          title: titleValue,
          stateId: columnId,
        },
      });
    },
    [projectSlug, boardSlug, columnId, taskTitle, createTask]
  );

  const onKeyDown = useInlineFieldKeyDown({
    onCancel: () => resetDraft(),
    onSubmit: () => handleCreateTask(true),
  });

  useInlineFieldOutsidePointerDown({
    enabled: isCreating,
    containerRef,
    onOutsidePointerDown: handleCreateTask,
  });

  if (!isCreating) {
    return (
      <Button variant="link" className="w-full justify-start" onClick={() => setIsCreating(true)}>
        <PlusIcon />
        Добавить задачу
      </Button>
    );
  }

  return (
    <Card ref={containerRef} className="p-2.5">
      <CardContent className="flex items-start gap-1 p-0">
        <Checkbox classNameInput="rounded-full" className="p-1" disabled />
        <Textarea
          autoFocus
          rows={3}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={onKeyDown}
          className="m-0 h-auto min-h-0 w-full resize-none overflow-y-hidden border-none p-1 leading-4 focus-visible:ring-0"
          placeholder="Введите название задачи..."
        />
      </CardContent>
    </Card>
  );
}
