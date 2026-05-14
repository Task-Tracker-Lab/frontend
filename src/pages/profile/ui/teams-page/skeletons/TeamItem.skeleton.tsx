import { ComponentProps } from 'react';
import { Item, ItemActions, ItemContent, ItemMedia, Skeleton } from 'shared/ui';

export function TeamItemSkeleton(props: Omit<ComponentProps<typeof Item>, 'children'>) {
  return (
    <Item {...props}>
      <ItemMedia>
        <Skeleton className="size-8 shrink-0 rounded-full" aria-hidden />
      </ItemMedia>
      <ItemContent className="gap-1">
        <Skeleton className="h-5 w-32 max-w-[70%]" aria-hidden />
        <Skeleton className="h-4 w-24 max-w-[55%]" aria-hidden />
      </ItemContent>
      <ItemActions>
        <Skeleton className="h-8 w-18 shrink-0 rounded-md" aria-hidden />
      </ItemActions>
    </Item>
  );
}
