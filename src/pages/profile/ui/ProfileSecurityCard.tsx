import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Switch,
} from 'shared/ui';
import { ComponentProps } from 'react';
import { useCurrentUser } from '../model/queries/use-current-user';
import { formatDate } from '../model/utils/format-date';

function ProfileSecurityCard(props: Omit<ComponentProps<typeof Card>, 'children'>) {
  const query = useCurrentUser();
  const is2faEnabled = query.data?.security.is2faEnabled ?? false;
  const lastPasswordChange = formatDate(query.data?.security.lastPasswordChange ?? '');

  return (
    <Card {...props}>
      <CardHeader className="pb-2">
        <CardTitle>Безопасность</CardTitle>
        <CardDescription>Состояние двухфакторной защиты и пароль.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 flex items-center justify-between gap-4 rounded-lg border p-4">
          <span className="text-muted-foreground text-sm">Двухфакторная аутентификация</span>
          <Switch
            checked={is2faEnabled}
            disabled
            aria-label="Состояние двухфакторной аутентификации"
          />
        </div>
        <Separator />
        <div className="bg-muted/20 flex items-center justify-between gap-4 rounded-lg border p-4">
          <span className="text-muted-foreground text-sm">Последняя смена пароля</span>
          <span className="text-sm font-semibold">{lastPasswordChange}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileSecurityCard };
