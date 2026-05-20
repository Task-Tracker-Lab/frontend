'use client';

import { ComponentProps, useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from 'shared/ui';
import { useControllableState } from 'shared/lib/hooks';
import { InviteTeamMemberForm } from './InviteTeamMemberForm';

interface InviteTeamMemberDialogProps extends ComponentProps<typeof DialogTrigger> {
  dialog?: ComponentProps<typeof Dialog>;
}

export function InviteTeamMemberDialog({ dialog = {}, ...props }: InviteTeamMemberDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultValue: dialog.defaultOpen,
    value: dialog.open,
    onChange: dialog.onOpenChange,
  });
  const formId = useId();
  const [pending, setPending] = useState(false);

  return (
    <Dialog {...dialog} open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props} />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Пригласить участника</DialogTitle>
          <DialogDescription>
            Введите email и выберите роль. Участник получит приглашение на указанный адрес.
          </DialogDescription>
        </DialogHeader>

        <InviteTeamMemberForm
          id={formId}
          mutateOptions={{
            onMutate: () => {
              setPending(true);
            },
            onSuccess: () => {
              setOpen(false);
            },
            onSettled: () => {
              setPending(false);
            },
          }}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={pending}>
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" form={formId} disabled={pending}>
            {pending ? <Spinner /> : null}
            Пригласить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
