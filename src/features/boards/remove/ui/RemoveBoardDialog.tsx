import { ComponentProps } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'shared/ui';
import { RemoveBoardVariables, useRemoveBoard } from '../model/useRemoveBoard';

type Props = ComponentProps<typeof AlertDialogTrigger> & RemoveBoardVariables;

export function RemoveBoardDialog({ projectSlug, boardSlug, ...props }: Props) {
  const removeBoard = useRemoveBoard();

  const onRemove = () => {
    removeBoard.mutate({ projectSlug, boardSlug });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить доску?</AlertDialogTitle>
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
