import { type TBoard } from 'entities/board';
import { SwitchBoardView } from './SwitchBoardView';

type ProjectBoardsHeaderProps = {
  currentView: TBoard.BoardViewType;
  onViewChange: (view: TBoard.BoardViewType) => void;
};

export function ProjectBoardsHeader({ currentView, onViewChange }: ProjectBoardsHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <SwitchBoardView currentView={currentView} onViewChange={onViewChange} />
    </div>
  );
}
