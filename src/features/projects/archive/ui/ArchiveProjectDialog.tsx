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
import { useArchiveProject } from '../model/useArchiveProject';

interface ArchiveProjectDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamSlug: string;
  projectId: string;
  onArchived?: () => void;
}

export function ArchiveProjectDialog({
  projectName,
  teamSlug,
  projectId,
  onArchived,
  ...props
}: ArchiveProjectDialogProps) {
  const archiveProject = useArchiveProject({
    onSuccess: () => onArchived?.(),
  });

  const onArchive = () => {
    archiveProject.mutate({ teamSlug, id: projectId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Архивировать проект?</AlertDialogTitle>
          <AlertDialogDescription>
            Проект «{projectName}» будет скрыт из активных. Его можно восстановить позже из архива.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction disabled={archiveProject.isPending} onClick={onArchive}>
            Архивировать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
