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
import { useRemoveTeam } from '../model/useRemoveTeam';

interface Props extends ComponentProps<typeof AlertDialogTrigger> {
  teamName: string;
  slug: string;
}

export function RemoveTeamDialog({ teamName, slug, ...props }: Props) {
  const [inputValue, setInputValue] = useState('');
  const removeTeam = useRemoveTeam();

  const isMatch = inputValue.trim() === teamName.trim();

  const onRemove = () => {
    removeTeam.mutate(slug);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить рабочее пространство?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Для подтверждения введите название рабочего пространства:
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
