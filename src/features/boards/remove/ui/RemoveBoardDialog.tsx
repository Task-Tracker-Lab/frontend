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
import { RemoveBoardVariables, useRemoveBoard } from '../model/useRemoveBoard';

type Props = ComponentProps<typeof AlertDialogTrigger> &
  RemoveBoardVariables & { boardName: string };

export function RemoveBoardDialog({ projectSlug, boardSlug, boardName, ...props }: Props) {
  const removeBoard = useRemoveBoard();

  const onRemove = () => {
    removeBoard.mutate({ projectSlug, boardSlug });
  };

  return (
    <AlertDialog>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить доску?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы действительно хотите удалить доску <span className="font-medium">{boardName}</span>?
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
