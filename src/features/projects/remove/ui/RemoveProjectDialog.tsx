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
import { useRemoveProject } from '../model/useRemoveProject';

interface Props extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamId: string;
  projectId: string;
}

export function RemoveProjectDialog({ projectName, teamId, projectId, ...props }: Props) {
  const [inputValue, setInputValue] = useState('');
  const removeProject = useRemoveProject();

  const isMatch = inputValue.trim() === projectName.trim();

  const onRemove = () => {
    removeProject.mutate({ teamId, id: projectId });
  };

  return (
    <AlertDialog>
      {props.children ? <AlertDialogTrigger {...props} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Для подтверждения введите название проекта:
            <span className="text-foreground mt-1 block font-medium">{projectName}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={projectName}
          aria-label="Название проекта для подтверждения удаления"
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
