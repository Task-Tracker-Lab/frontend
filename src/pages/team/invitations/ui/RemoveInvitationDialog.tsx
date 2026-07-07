'use client';

import { MailX } from 'lucide-react';
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
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'shared/ui';
import { useRemoveInvitation } from '../api/useRemoveInvitation';

interface RemoveInvitationDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  code: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function RemoveInvitationDialog({
  code,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: RemoveInvitationDialogProps) {
  const [dialogOpen, setDialogOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: open,
    onChange: onOpenChange,
  });

  const { mutate, isPending } = useRemoveInvitation({
    onSuccess: () => setDialogOpen(false),
  });

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <MailX />
          </AlertDialogMedia>
          <AlertDialogTitle>Отозвать приглашение?</AlertDialogTitle>
          <AlertDialogDescription>
            Ссылка-приглашение станет недействительной. Вы сможете отправить новое приглашение
            позже.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate(code)}
          >
            Отозвать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
