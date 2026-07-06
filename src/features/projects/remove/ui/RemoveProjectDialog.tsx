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
import { useRemoveProject } from '../api/useRemoveProject';

interface Props extends ComponentProps<typeof AlertDialogTrigger> {
  projectName: string;
  teamId: string;
  slug: string;
}

export function RemoveProjectDialog({ projectName, teamId, slug, ...props }: Props) {
  const [inputValue, setInputValue] = useState('');
  const removeProject = useRemoveProject();

  const isMatch = inputValue.trim() === projectName.trim();

  const onRemove = () => {
    removeProject.mutate({ teamId, slug });
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
          <AlertDialogAction
            variant="destructive"
            disabled={!isMatch || removeProject.isPending}
            onClick={onRemove}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
