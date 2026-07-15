import { ComponentType } from 'react';
import {
  DropdownMenuItem,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'shared/ui';

interface QuickCreateItemProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  disabled?: boolean;
  onOpenChange: () => void;
}

export function QuickCreateItem({
  icon: Icon,
  title,
  description,
  disabled = false,
  onOpenChange,
}: QuickCreateItemProps) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      onSelect={() => {
        onOpenChange();
      }}
    >
      <Item className="flex-nowrap p-0">
        <ItemMedia className="bg-primary/20 rounded-full p-2">
          <Icon className="text-muted-foreground" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="whitespace-nowrap">{description}</ItemDescription>
        </ItemContent>
      </Item>
    </DropdownMenuItem>
  );
}
