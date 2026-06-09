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
import { useArchiveProject } from '../model/useArchiveProject';

interface ArchiveProjectDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamId: string;
  projectId: string;
  onArchived?: () => void;
  dialog?: ComponentProps<typeof AlertDialog>;
}

export function ArchiveProjectDialog({
  projectName,
  teamId,
  projectId,
  onArchived,
  dialog = {},
  ...props
}: ArchiveProjectDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultValue: dialog.defaultOpen,
    value: dialog.open,
    onChange: dialog.onOpenChange,
  });

  const archiveProject = useArchiveProject({
    onSuccess: () => {
      setOpen(false);
      onArchived?.();
    },
  });

  const onArchive = () => {
    archiveProject.mutate({ teamId, id: projectId });
  };

  return (
    <AlertDialog {...dialog} open={open} onOpenChange={setOpen}>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
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
