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
import { CreateBoardForm } from './CreateBoardForm';

interface CreateProjectDialogProps extends ComponentProps<typeof DialogTrigger> {
  dialog?: ComponentProps<typeof Dialog>;
}

export function CreateBoardDialog({ dialog = {}, ...props }: CreateProjectDialogProps) {
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
          <DialogTitle>Новая доска</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <CreateBoardForm
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
            Создать доску
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
