'use client';

import { UserX } from 'lucide-react';
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
import { useRemoveMember } from '../api/useRemoveMember';

interface RemoveMemberDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  userId: string;
  name: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function RemoveMemberDialog({
  userId,
  name,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: RemoveMemberDialogProps) {
  const [dialogOpen, setDialogOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: open,
    onChange: onOpenChange,
  });

  const { mutate, isPending } = useRemoveMember({
    onSuccess: () => setDialogOpen(false),
  });

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <UserX />
          </AlertDialogMedia>
          <AlertDialogTitle>Удалить участника?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">{name}</span> будет исключён из команды. Вы сможете
            пригласить его снова позже.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate(userId)}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
