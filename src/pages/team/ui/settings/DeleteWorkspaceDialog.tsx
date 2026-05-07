import { useState } from 'react';
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
  Button,
  Input,
} from 'shared/ui';

interface Props {
  workspaceName: string;
}

export function DeleteWorkspaceDialog({ workspaceName }: Props) {
  const [inputValue, setInputValue] = useState('');

  const isMatch = inputValue.trim() === workspaceName.trim();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Удалить рабочее пространство
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить рабочее пространство?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Для подтверждения введите название рабочего пространства:
            <span className="text-foreground mt-1 block font-medium">{workspaceName}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={workspaceName}
          aria-label="Название рабочего пространства для подтверждения удаления"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setInputValue('')}>Отмена</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={!isMatch}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
