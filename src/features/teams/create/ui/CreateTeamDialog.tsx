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
import { CreateTeamForm } from './CreateTeamForm';
import { useControllableState } from 'shared/lib/hooks';

interface CreateTeamDialogProps extends ComponentProps<typeof DialogTrigger> {
  dialog?: ComponentProps<typeof Dialog>;
}

export function CreateTeamDialog({ dialog = {}, ...props }: CreateTeamDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultValue: dialog.defaultOpen,
    value: dialog.open,
    onChange: dialog.onOpenChange,
  });
  const formId = useId();
  const [pending, setPending] = useState(false);

  return (
    <Dialog {...dialog} open={open} onOpenChange={setOpen}>
      {props.children ? <DialogTrigger {...props} /> : null}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Новая команда</DialogTitle>
          <DialogDescription>
            Укажите название и описание. Короткий адрес в ссылке можно задать вручную или оставить
            пустым.
          </DialogDescription>
        </DialogHeader>

        <CreateTeamForm
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
            Создать команду
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
