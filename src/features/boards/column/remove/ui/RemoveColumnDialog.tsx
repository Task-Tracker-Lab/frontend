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
import { RemoveColunmnVariables, useRemoveColumn } from '../model/useRemoveColumn';

type Props = ComponentProps<typeof AlertDialogTrigger> & RemoveColunmnVariables;

export function RemoveColumnDialog({ columnId, boardId, ...props }: Props) {
  const removeBoard = useRemoveColumn();

  const onRemove = () => {
    removeBoard.mutate({ columnId, boardId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить колонку?</AlertDialogTitle>
          <AlertDialogDescription>
            При удалении колонки будут удалены все задачи в ней
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
