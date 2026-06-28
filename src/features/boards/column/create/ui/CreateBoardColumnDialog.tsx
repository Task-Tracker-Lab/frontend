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
import { CreateBoardColumnForm } from './CreateBoardColumnForm';

interface CreateBoardColumnDialogProps extends ComponentProps<typeof DialogTrigger> {
  boardSlug: string;
  dialog?: ComponentProps<typeof Dialog>;
}

export function CreateBoardColumnDialog({
  boardSlug,
  dialog = {},
  ...props
}: CreateBoardColumnDialogProps) {
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
      <DialogContent className="!max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый этап</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <CreateBoardColumnForm
          id={formId}
          boardSlug={boardSlug}
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
            Создать этап
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
