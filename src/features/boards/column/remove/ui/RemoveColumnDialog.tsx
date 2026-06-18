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
import {
  RemoveColunmnVariables,
  UseDeleteColumnOptions,
  useRemoveColumn,
} from '../model/useRemoveColumn';

type Props = ComponentProps<typeof AlertDialogTrigger> &
  RemoveColunmnVariables & { options?: UseDeleteColumnOptions };

export function RemoveColumnDialog({ columnId, boardSlug, options = {}, ...props }: Props) {
  const removeBoard = useRemoveColumn(options);

  const onRemove = () => {
    removeBoard.mutate({ columnId, boardSlug });
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
