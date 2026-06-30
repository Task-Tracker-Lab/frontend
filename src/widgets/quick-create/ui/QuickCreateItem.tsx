import { ReactNode } from 'react';
import {
  DropdownMenuItem,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

interface QuickCreateItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  onOpenChange: () => void;
}

export function QuickCreateItem({
  icon,
  title,
  description,
  disabled = false,
  onOpenChange,
}: QuickCreateItemProps) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      onSelect={(e) => {
        e.preventDefault();
        onOpenChange();
      }}
    >
      <Item className="flex-nowrap p-0">
        <ItemMedia className="bg-primary/20 rounded-full p-2">{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="whitespace-nowrap">{description}</ItemDescription>
        </ItemContent>
      </Item>
    </DropdownMenuItem>
  );
}
