import { UserX } from 'lucide-react';
import { ComponentProps } from 'react';
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
import { useRemoveMember } from '../../api/useRemoveMember';

interface RemoveMemberDialogProps extends ComponentProps<typeof AlertDialogTrigger> {
  userId: string;
  name: string;
}

export function RemoveMemberDialog({ userId, name, ...props }: RemoveMemberDialogProps) {
  const { mutate, isPending } = useRemoveMember();

  return (
    <AlertDialog>
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
