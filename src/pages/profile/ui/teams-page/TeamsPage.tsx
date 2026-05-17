'use client';

import { CreateTeamDialog } from 'features/teams/create';
import { Plus } from 'lucide-react';
import { Button, CardSection, Separator } from 'shared/ui';
import { Invitations } from './Invitations';
import { TeamsList } from './TeamList';

function TeamsPage() {
  return (
    <>
      <CardSection
        title="Команды"
        description="Рабочие пространства, в которых вы участвуете, и новые приглашения."
        className="space-y-8"
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Мои команды</h3>
            <CreateTeamDialog asChild>
              <Button type="button" size="sm">
                <Plus className="size-4" />
                Создать команду
              </Button>
            </CreateTeamDialog>
          </div>
          <TeamsList />
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Приглашения</h3>
          <Invitations />
        </div>
      </CardSection>
    </>
  );
}

export { TeamsPage };
