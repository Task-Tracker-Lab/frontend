import { TeamAvatar } from 'entities/team';
import type { TUser } from 'entities/user';
import { ComponentProps, ReactNode } from 'react';
import { Item, ItemActions, ItemContent } from 'shared/ui';

interface ITeamItemProps extends Partial<
  Pick<TUser.UserTeamResponse, 'avatar' | 'name' | 'description'>
> {
  action?: ReactNode;
}

export function TeamItem(props: ITeamItemProps & Omit<ComponentProps<typeof Item>, 'children'>) {
  const { avatar, name, description, action, ...itemProps } = props;

  return (
    <>
      <TeamAvatar src={avatar?.small ?? undefined} />
      <Item {...itemProps}>
        <ItemContent>
          <div className="grid text-sm leading-tight">
            <span className="truncate font-medium">{name ?? 'no data'}</span>
            {description && <span className="truncate text-xs">{description}</span>}
          </div>
        </ItemContent>
        {props.action && <ItemActions>{action}</ItemActions>}
      </Item>
    </>
  );
}
