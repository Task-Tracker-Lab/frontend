import { BOARD_COLUMN_COLORS } from 'entities/board';
import { TTask } from 'entities/task';
import { GripVerticalIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { classNames } from 'shared/lib/utils';
import { Button, KanbanColumnHandle } from 'shared/ui';
import { ColumnHeaderActions } from './ColumnHeaderActions';
import { CreateTaskInline } from './CreateTaskInline';

export interface TaskColumnHeaderProps {
  value: string;
  tasks: TTask.Task[];
  tasksLength: number;
  title: string;
  color: string;
  boardSlug: string;
  projectSlug: string;
  className?: string;
}

export function TaskColumnHeader(props: TaskColumnHeaderProps) {
  const { tasks, tasksLength, title, color, boardSlug, projectSlug, className, value } = props;
  const [activeColor, setActiveColor] = useState<string>(color ?? BOARD_COLUMN_COLORS[0]);
  const columnId = value;

  const colors = useMemo(() => {
    return [...new Set([color, ...BOARD_COLUMN_COLORS])].filter(Boolean) as string[];
  }, [color]);

  return (
    <div className={classNames('overflow-hidden', {}, [className])}>
      <div className="overflow-hidden">
        <div style={{ backgroundColor: activeColor }} className="h-1.5" />
        <div className="flex h-8 items-center justify-between gap-2 px-2.5 py-1.5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-muted-foreground line-clamp-1 text-sm font-medium">{`${title} (${tasksLength})`}</h3>
          </div>
          <div className="flex items-center">
            <KanbanColumnHandle asChild>
              <Button size="icon-xs" variant="ghost">
                <GripVerticalIcon />
              </Button>
            </KanbanColumnHandle>
            <ColumnHeaderActions
              columnId={columnId}
              boardSlug={boardSlug}
              colors={colors}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
            />
          </div>
        </div>
        <div className="px-2.5">
          <CreateTaskInline
            projectSlug={projectSlug}
            boardSlug={boardSlug}
            columnId={columnId}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
}
