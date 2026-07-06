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
} from '../api/useRemoveColumn';

type Props = ComponentProps<typeof AlertDialogTrigger> &
  RemoveColunmnVariables & { options?: UseDeleteColumnOptions };

export function RemoveColumnDialog({ columnId, boardSlug, options = {}, ...props }: Props) {
  const removeBoard = useRemoveColumn(options);

  const onRemove = () => {
    removeBoard.mutate({ columnId, boardSlug });
  };

  return (
    <AlertDialog>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogDescription>Удаление этапа</AlertDialogDescription>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить этап?</AlertDialogTitle>
          <AlertDialogDescription>
            При удалении этапа будут удалены все задачи в нем
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
