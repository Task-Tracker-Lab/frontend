'use client';

import { ComponentProps, useId, useState } from 'react';
import { useControllableState } from 'shared/lib/hooks';
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
import { CreateProjectForm } from './CreateProjectForm';

interface CreateProjectDialogProps extends ComponentProps<typeof DialogTrigger> {
  dialog?: ComponentProps<typeof Dialog>;
}

export function CreateProjectDialog({ dialog = {}, ...props }: CreateProjectDialogProps) {
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
      <DialogContent className="!max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый проект</DialogTitle>
          <DialogDescription>
            Название и ключ для задач команды. Иконку и цвет можно изменить по желанию.
          </DialogDescription>
        </DialogHeader>

        <CreateProjectForm
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
            Создать проект
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
