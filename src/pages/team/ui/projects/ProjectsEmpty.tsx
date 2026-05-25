import { CreateProjectDialog } from 'features/projects/create';
import { FolderKanban } from 'lucide-react';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'shared/ui';

export function ProjectsEmpty() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderKanban />
        </EmptyMedia>
        <EmptyTitle>Нет проектов</EmptyTitle>
        <EmptyDescription>
          Создайте первый проект команды, чтобы он появился в этом списке.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateProjectDialog asChild>
          <Button>Создать проект</Button>
        </CreateProjectDialog>
      </EmptyContent>
    </Empty>
  );
}
