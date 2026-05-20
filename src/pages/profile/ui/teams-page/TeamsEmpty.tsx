import { UserRoundXIcon } from 'lucide-react';

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'shared/ui';
import { CreateTeamDialog } from 'features/teams/create';

export function TeamsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserRoundXIcon />
        </EmptyMedia>
        <EmptyTitle>Команды отсутствуют</EmptyTitle>
        <EmptyDescription>
          У вас пока нет команд. Начните с создания первой команды.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <CreateTeamDialog asChild>
          <Button>Создать команду</Button>
        </CreateTeamDialog>
      </EmptyContent>
    </Empty>
  );
}
