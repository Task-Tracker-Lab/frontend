import { type TTeam } from 'entities/team';
import { Clock, Copy, MailIcon, RotateCw, X } from 'lucide-react';
import { ComponentProps } from 'react';
import { classNames, formatDate } from 'shared/lib/utils';
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
import { InvitationRoleSelect } from './InvitationRoleSelect';
import { RemoveInvitationDialog } from './RemoveInvitationDialog';

interface InvitationCardProps extends Omit<ComponentProps<typeof ItemGroup>, 'children'> {
  inv: TTeam.TeamInvitationResponse;
}

export function InvitationCard({ className, inv, ...props }: InvitationCardProps) {
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
            <div className="mt-1 flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground text-xs">Роль:</span>
                <InvitationRoleSelect code={inv.code} role={inv.role} />
              </div>
              <div className="flex items-center gap-1.5">
                <MailIcon size={12} />
                <span className="text-muted-foreground text-xs">
                  Отправлено {formatDate(inv.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <ItemActions>
            <RemoveInvitationDialog code={inv.code}>
              <Button variant="ghost">
                <X size={14} className="text-muted-foreground/50" />
              </Button>
            </RemoveInvitationDialog>
          </ItemActions>
        </ItemHeader>
        <ItemContent>
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock size={12} />
            <span>
              Ссылка истекает{' '}
              <span className="text-muted-foreground font-medium">{formatDate(inv.expiresAt)}</span>
            </span>
          </div>
        </ItemContent>
        <ItemFooter className="flex-wrap">
          <Button size="sm" variant="outline-primary">
            <RotateCw size={13} /> Отправить повторно{' '}
            <Badge variant="destructive">Не реализовано</Badge>
          </Button>
          <Button size="sm" variant="outline-primary">
            <Copy size={13} /> Копировать ссылку <Badge variant="destructive">Не реализовано</Badge>
          </Button>
        </ItemFooter>
      </Item>
    </ItemGroup>
  );
}
