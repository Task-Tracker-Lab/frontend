import { MailX } from 'lucide-react';
import { PropsWithChildren } from 'react';
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
import { useRemoveMemberInvitation } from '../../api/useRemoveMemberInvitation';

interface RemoveInvitationDialogProps extends PropsWithChildren {
  code: string;
}

export function RemoveInvitationDialog({ code, children }: RemoveInvitationDialogProps) {
  const { mutate, isPending } = useRemoveMemberInvitation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
