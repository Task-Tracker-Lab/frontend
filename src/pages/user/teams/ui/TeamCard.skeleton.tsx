import { ComponentProps } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from 'shared/ui';

export function TeamCardSkeleton(props: Omit<ComponentProps<typeof Item>, 'children'>) {
  return (
    <Item {...props}>
      <ItemMedia>
        <div className="relative w-fit">
          <Skeleton className="size-10 shrink-0 rounded-full" aria-hidden />
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton className="h-4 w-32 max-w-[70%]" aria-hidden />
        </ItemTitle>
        <ItemDescription>
          <Skeleton className="mt-1 h-3 w-full max-w-[90%]" aria-hidden />
        </ItemDescription>
      </ItemContent>
      <ItemActions className="self-start">
        <Skeleton className="size-8 shrink-0 rounded-md" aria-hidden />
      </ItemActions>
    </Item>
  );
}
