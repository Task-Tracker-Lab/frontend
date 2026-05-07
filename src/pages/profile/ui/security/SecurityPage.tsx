'use client';

import { CardSection, OptionItem, Separator, Switch } from 'shared/ui';
import { formatDate } from 'shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { UserQueries } from 'entities/user';

function SecurityPage() {
  const query = useQuery(UserQueries.getMe());
  const is2faEnabled = query.data?.security.is2faEnabled ?? false;
  const lastPasswordChange = formatDate(query.data?.security.lastPasswordChange ?? '');

  return (
    <CardSection
      title="Безопасность"
      description="Состояние двухфакторной защиты и пароль."
      className="space-y-5"
    >
      <OptionItem
        label="Двухфакторная аутентификация"
        input={(props) => (
          <Switch
            checked={is2faEnabled}
            disabled
            aria-label="Состояние двухфакторной аутентификации"
            {...props}
          />
        )}
      />
      <Separator />
      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground text-sm">Последняя смена пароля</span>
        <span className="text-sm font-semibold">{lastPasswordChange}</span>
      </div>
    </CardSection>
  );
}

export { SecurityPage };
