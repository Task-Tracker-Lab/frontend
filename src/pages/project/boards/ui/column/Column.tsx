import { type TTask } from 'entities/task';
import { ComponentProps } from 'react';
import { useFixedHeightWithMax } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/utils';
import { KanbanColumn, KanbanColumnContent, ScrollArea, ScrollBar } from 'shared/ui';
import { Task } from '../task/Task';
import { TaskColumnHeader } from './ColumnHeader';

interface ColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  projectSlug: string;
  boardSlug: string;
  title: string;
  id: string;
  color: string;
  tasks: TTask.Task[];
}

export function Column({
  value,
  className,
  projectSlug,
  boardSlug,
  title,
  id,
  color,
  tasks,
  ...props
}: ColumnProps) {
  const { ref: contentRef, style: scrollAreaStyle } = useFixedHeightWithMax<HTMLDivElement>({
    maxHeight: 'calc(100dvh - 16rem)',
  });

  return (
    <KanbanColumn
      value={value}
      className={classNames(
        'border-border bg-secondary h-min w-[320px] min-w-[320px] gap-2.5 overflow-hidden rounded-xl border select-none',
        {},
        [className]
      )}
      {...props}
    >
      <TaskColumnHeader
        tasks={tasks}
        tasksLength={tasks.length}
        title={title}
        value={id}
        color={color}
        boardSlug={boardSlug}
        projectSlug={projectSlug}
      />
      <ScrollArea
        style={scrollAreaStyle}
        className="[&_[data-slot=scroll-area-thumb]]:bg-secondary-foreground/40 transition-[height] duration-200"
      >
        <div ref={contentRef} data-teet>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5 px-2.5 pt-0.5 pb-2">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            <ScrollBar />
          </KanbanColumnContent>
        </div>
      </ScrollArea>
    </KanbanColumn>
  );
}
