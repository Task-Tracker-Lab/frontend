import {
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemHeader,
} from 'shared/ui';
import { classNames } from 'shared/lib/utils';
import { TTeam } from 'entities/team';
import { ComponentProps } from 'react';
import { Clock, Copy, RotateCw, X } from 'lucide-react';

interface InviteCardProps extends Omit<ComponentProps<typeof ItemGroup>, 'children'> {
  inv: TTeam.TeamInvitationResponse;
}

export function InviteCard({ className, inv, ...props }: InviteCardProps) {
  return (
    <ItemGroup
      className={classNames(
        'border-muted-foreground bg-primary/2 rounded-xl border border-dashed',
        {},
        [className]
      )}
      {...props}
    >
      <Item>
        <ItemHeader className="items-start justify-between">
          <div>
            <div className="font-semibold">{inv.email}</div>
            <div className="mt-1 space-x-2">
              <Badge>{inv.role}</Badge>
              <span className="text-muted-foreground text-xs">Отправлено {inv.createdAt}</span>{' '}
              {/*todo calculate*/}
            </div>
          </div>
          <ItemActions>
            <Button variant="ghost">
              <X size={14} className="text-muted-foreground/50" />
            </Button>
          </ItemActions>
        </ItemHeader>
        <ItemContent>
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock size={12} />
            <span>
              Ссылка истекает через{' '}
              <span className="text-muted-foreground font-medium">{inv.expiresAt}</span>
              {/*todo calculate*/}
            </span>
          </div>
        </ItemContent>
        <ItemFooter className="flex-wrap">
          <Button size="sm" variant="outline-primary">
            <RotateCw size={13} /> Отправить повторно
          </Button>
          <Button size="sm" variant="outline-primary">
            <Copy size={13} /> Копировать ссылку
          </Button>
        </ItemFooter>
      </Item>
    </ItemGroup>
  );
}
