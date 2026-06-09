import { ComponentProps } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from 'shared/ui';

export function InvitationCardSkeleton(props: Omit<ComponentProps<typeof Item>, 'children'>) {
  return (
    <Item {...props}>
      <ItemHeader>
        <ItemMedia>
          <Skeleton className="size-8 shrink-0 rounded-full" aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Skeleton className="h-4 w-32 max-w-[70%]" aria-hidden />
          </ItemTitle>
        </ItemContent>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>
          <Skeleton className="h-3 w-24" aria-hidden />
          <Skeleton className="mt-1 h-3 w-20" aria-hidden />
          <Skeleton className="mt-1 h-3 w-28" aria-hidden />
        </ItemDescription>
        <ItemActions className="mt-2">
          <Skeleton className="h-8 w-20 shrink-0 rounded-md" aria-hidden />
        </ItemActions>
      </ItemContent>
    </Item>
  );
}
