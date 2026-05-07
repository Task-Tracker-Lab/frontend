'use client';

import { useState } from 'react';
import { Badge, CardSection, OptionGroup, Switch } from 'shared/ui';
import { DEFAULTS, PERMISSION_GROUPS, PermissionKey, RoleKey, ROLES } from '../../model/roles-mock';

interface PermissionsProps {
  className?: string;
  active: RoleKey;
}

export function Permissions({ className, active }: PermissionsProps) {
  const [matrix, setMatrix] = useState(DEFAULTS);

  const update = (role: RoleKey, key: PermissionKey, v: boolean) => {
    setMatrix((m) => ({ ...m, [role]: { ...m[role], [key]: v } }));
  };

  return (
    <CardSection
      className={className}
      title={
        <>
          <span>Права роли {active}</span>
          {ROLES.find((r) => r.key === active)?.locked && (
            <Badge variant="destructive">Системная роль</Badge>
          )}
        </>
      }
      description={`Настройте действия, разрешённые для роли ${active}.`}
    >
      {PERMISSION_GROUPS.map((group) => (
        <OptionGroup
          key={group.label}
          name={group.label}
          items={group.items.map((p) => {
            const lockedPerm = p.key === 'billing.view' && active !== 'Admin';
            return {
              key: p.key,
              label: p.label,
              hint: lockedPerm ? 'Зарезервировано для роли Admin' : undefined,
              input: (props) => (
                <Switch
                  checked={matrix[active][p.key]}
                  onCheckedChange={(v) => update(active, p.key, v)}
                  disabled={lockedPerm}
                  {...props}
                />
              ),
            };
          })}
        />
      ))}
    </CardSection>
  );
}
