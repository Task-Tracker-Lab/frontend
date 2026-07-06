import { ComponentProps, useState } from 'react';
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
  Input,
} from 'shared/ui';
import { useRemoveTeam } from '../api/useRemoveTeam';

interface Props extends ComponentProps<typeof AlertDialogTrigger> {
  teamName: string;
  teamId: string;
  dialog?: ComponentProps<typeof AlertDialog>;
}

export function RemoveTeamDialog({ teamName, teamId, dialog = {}, ...props }: Props) {
  const [inputValue, setInputValue] = useState('');
  const removeTeam = useRemoveTeam();

  const isMatch = inputValue.trim() === teamName.trim();

  const onRemove = () => {
    removeTeam.mutate(teamId);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInputValue('');
    }

    dialog.onOpenChange?.(open);
  };

  return (
    <AlertDialog {...dialog} onOpenChange={handleOpenChange}>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить команду?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Для подтверждения введите название команды:
            <span className="text-foreground mt-1 block font-medium">{teamName}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={teamName}
          aria-label="Название команды для подтверждения удаления"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setInputValue('')}>Отмена</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={!isMatch} onClick={onRemove}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
