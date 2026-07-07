import { CardSection, Item, ItemActions, ItemContent, ItemMedia, Skeleton } from 'shared/ui';

export function OAuthSectionFallback() {
  return (
    <CardSection
      title="Связанные аккаунты"
      description="Управление привязкой к социальным сетям и сервисам"
    >
      <ul
        className="flex flex-col gap-2"
        role="list"
        aria-busy="true"
        aria-label="Загрузка связанных аккаунтов"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <Item variant="outline" className="items-center">
              <ItemMedia>
                <Skeleton className="size-6 rounded-lg" aria-hidden />
              </ItemMedia>
              <ItemContent>
                <Skeleton className="h-4 w-28" aria-hidden />
                <Skeleton className="h-5 w-24 rounded-4xl lg:hidden" aria-hidden />
              </ItemContent>
              <ItemActions className="gap-3">
                <Skeleton className="hidden h-5 w-24 rounded-4xl lg:block" aria-hidden />
                <Skeleton className="h-8 min-w-[106px] rounded-md" aria-hidden />
              </ItemActions>
            </Item>
          </li>
        ))}
      </ul>
    </CardSection>
  );
}
