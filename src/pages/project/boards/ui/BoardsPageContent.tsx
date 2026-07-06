'use client';

import ScrollContainer from 'react-indiana-drag-scroll';
import { classNames } from 'shared/lib/utils';
import { Board } from './board/Board';
import { BoardList } from './stages/Stages';

interface BoardsPageContentProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  projectSlug: string;
  boardSlug: string;
}

export function BoardsPageContent({
  projectSlug,
  boardSlug,
  className,
  ...props
}: BoardsPageContentProps) {
  return (
    <div className={classNames('flex h-full flex-col gap-5 pt-5', {}, [className])} {...props}>
      <BoardList className="px-4" projectSlug={projectSlug} boardSlug={boardSlug} />
      <ScrollContainer
        className="flex grow flex-col px-4"
        ignoreElements="[data-slot='kanban-column']"
        vertical={false}
        hideScrollbars={false}
      >
        <Board projectSlug={projectSlug} boardSlug={boardSlug} />
      </ScrollContainer>
    </div>
  );
}
