import { type TBoard } from 'entities/board';
import { SquareKanban, Calendar, GanttChart, List } from 'lucide-react';
import { type ComponentType } from 'react';
import { Button } from 'shared/ui';

const VIEWS = [
  { view: 'kanban', label: 'Доска', icon: SquareKanban },
  { view: 'calendar', label: 'Календарь', icon: Calendar },
  { view: 'gantt', label: 'Гант', icon: GanttChart },
  { view: 'list', label: 'Список', icon: List },
] satisfies {
  view: TBoard.BoardViewType;
  label: string;
  icon: ComponentType;
}[];

type ProjectBoardViewsProps = {
  currentView: TBoard.BoardViewType;
  onViewChange: (view: TBoard.BoardViewType) => void;
};

export function SwitchBoardView({ onViewChange, currentView }: ProjectBoardViewsProps) {
  return (
    <div className="flex gap-1">
      {VIEWS.map((item) => {
        const isActive = currentView === item.view;
        return (
          <Button
            variant={isActive ? 'default' : 'outline'}
            onClick={() => onViewChange(item.view)}
            key={`${item.view}-button`}
          >
            <item.icon />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
