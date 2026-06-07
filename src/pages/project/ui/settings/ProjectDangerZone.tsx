'use client';

import { RemoveProjectDialog } from 'features/projects/remove';
import { AlertTriangle } from 'lucide-react';
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

interface ProjectDangerZoneProps {
  projectName: string;
  teamId: string;
  projectId: string;
}

export function ProjectDangerZone({ projectName, teamId, projectId }: ProjectDangerZoneProps) {
  return (
    <Item variant="destructive">
      <ItemMedia>
        <AlertTriangle size={16} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Опасная зона</ItemTitle>
        <ItemDescription className="text-xs">
          Безвозвратно удалить проект со всеми задачами и данными.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <RemoveProjectDialog
          projectName={projectName}
          teamId={teamId}
          projectId={projectId}
          asChild
        >
          <Button variant="destructive" size="sm">
            Удалить проект
          </Button>
        </RemoveProjectDialog>
      </ItemActions>
    </Item>
  );
}
