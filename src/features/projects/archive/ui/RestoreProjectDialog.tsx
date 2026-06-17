'use client';

import { ComponentProps } from 'react';
import { useControllableState } from 'shared/lib/hooks';
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
import { useRestoreProject } from '../model/useRestoreProject';

interface RestoreProjectDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamId: string;
  slug: string;
  dialog?: ComponentProps<typeof AlertDialog>;
}

export function RestoreProjectDialog({
  projectName,
  teamId,
  slug,
  dialog = {},
  ...props
}: RestoreProjectDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultValue: dialog.defaultOpen,
    value: dialog.open,
    onChange: dialog.onOpenChange,
  });

  const restoreProject = useRestoreProject({
    onSuccess: () => setOpen(false),
  });

  const onRestore = () => {
    restoreProject.mutate({ teamId, slug });
  };

  return (
    <AlertDialog {...dialog} open={open} onOpenChange={setOpen}>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Восстановить проект?</AlertDialogTitle>
          <AlertDialogDescription>
            Проект «{projectName}» снова станет активным и появится в списке проектов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction disabled={restoreProject.isPending} onClick={onRestore}>
            Восстановить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
