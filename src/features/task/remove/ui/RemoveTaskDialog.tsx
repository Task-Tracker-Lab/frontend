import { ComponentProps } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'shared/ui';
import { RemoveTaskVariables, useRemoveTask } from '../api/useRemoveTask';

type Props = ComponentProps<typeof AlertDialogTrigger> &
  RemoveTaskVariables & {
    taskTitle: string;
  };

export function RemoveTaskDialog({ slug, boardSlug, taskId, taskTitle, ...props }: Props) {
  const removeTask = useRemoveTask();

  const onRemove = () => {
    removeTask.mutate({ slug, boardSlug, taskId });
  };

  return (
    <AlertDialog>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы действительно хотите удалить задачу <span className="font-medium">{taskTitle}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onRemove}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
