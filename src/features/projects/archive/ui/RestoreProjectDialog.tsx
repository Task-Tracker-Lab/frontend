'use client';

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
import { useRestoreProject } from '../model/useRestoreProject';

interface RestoreProjectDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamId: string;
  projectId: string;
}

export function RestoreProjectDialog({
  projectName,
  teamId,
  projectId,
  ...props
}: RestoreProjectDialogProps) {
  const restoreProject = useRestoreProject();

  const onRestore = () => {
    restoreProject.mutate({ teamId, id: projectId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
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
