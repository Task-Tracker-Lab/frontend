'use client';

import { Plus, Shield } from 'lucide-react';
import { useState } from 'react';
import { FloatingSaveBar, Switch } from 'shared/ui';

type RoleKey = 'Admin' | 'Member' | 'Guest' | 'Viewer';

type PermissionKey =
  | 'task.create'
  | 'task.edit'
  | 'task.delete'
  | 'project.invite'
  | 'project.create'
  | 'billing.view';

const PERMISSION_GROUPS: { label: string; items: { key: PermissionKey; label: string }[] }[] = [
  {
    label: 'Управление задачами',
    items: [
      { key: 'task.create', label: 'Создавать задачи' },
      { key: 'task.edit', label: 'Редактировать задачи' },
      { key: 'task.delete', label: 'Удалять задачи' },
    ],
  },
  {
    label: 'Доступ к проектам',
    items: [
      { key: 'project.invite', label: 'Приглашать участников' },
      { key: 'project.create', label: 'Создавать проекты' },
    ],
  },
  {
    label: 'Биллинг',
    items: [{ key: 'billing.view', label: 'Просмотр счетов' }],
  },
];

const ROLES: { key: RoleKey; description: string; members: number; locked?: boolean }[] = [
  {
    key: 'Admin',
    description: 'Полный контроль рабочего пространства и биллинг.',
    members: 2,
    locked: true,
  },
  { key: 'Member', description: 'Стандартный доступ участника.', members: 12 },
  { key: 'Guest', description: 'Внешний, ограниченный доступ к проектам.', members: 4 },
  { key: 'Viewer', description: 'Доступ к проектам только для чтения.', members: 7 },
];

const DEFAULTS: Record<RoleKey, Record<PermissionKey, boolean>> = {
  Admin: {
    'task.create': true,
    'task.edit': true,
    'task.delete': true,
    'project.invite': true,
    'project.create': true,
    'billing.view': true,
  },
  Member: {
    'task.create': true,
    'task.edit': true,
    'task.delete': false,
    'project.invite': false,
    'project.create': true,
    'billing.view': false,
  },
  Guest: {
    'task.create': true,
    'task.edit': false,
    'task.delete': false,
    'project.invite': false,
    'project.create': false,
    'billing.view': false,
  },
  Viewer: {
    'task.create': false,
    'task.edit': false,
    'task.delete': false,
    'project.invite': false,
    'project.create': false,
    'billing.view': false,
  },
};

export function Roles() {
  const [matrix, setMatrix] = useState(DEFAULTS);
  const [saved, setSaved] = useState(DEFAULTS);
  const [active, setActive] = useState<RoleKey>('Member');

  const dirty = JSON.stringify(matrix) !== JSON.stringify(saved);

  const update = (role: RoleKey, key: PermissionKey, v: boolean) => {
    setMatrix((m) => ({ ...m, [role]: { ...m[role], [key]: v } }));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        {/* Role list */}
        <div className="flex flex-col gap-2">
          {ROLES.map((r) => {
            const isActive = active === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? 'border-primary/40 bg-primary/5 shadow-[0_4px_16px_-8px_rgba(11,153,255,0.4)]'
                    : 'bg-card border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground bg-slate-100'
                  }`}
                >
                  <Shield size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-muted-foreground text-sm font-semibold">{r.key}</p>
                    <span className="text-muted-foreground text-[10px] font-medium">
                      {r.members}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                    {r.description}
                  </p>
                </div>
              </button>
            );
          })}
          <button className="hover:border-primary/40 hover:text-primary text-muted-foreground mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-3 py-2.5 text-xs font-medium transition">
            <Plus size={13} /> Новая роль
          </button>
        </div>

        {/* Matrix */}
        <div key={active} className="bg-card rounded-xl border border-slate-200/80 p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-muted-foreground text-base font-semibold">Права роли {active}</h3>
              <p className="text-muted-foreground mt-1 text-xs">
                Настройте действия, разрешённые для роли{' '}
                <span className="text-muted-foreground font-medium">{active}</span>.
              </p>
            </div>
            {ROLES.find((r) => r.key === active)?.locked && (
              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
                Системная роль
              </span>
            )}
          </div>

          <div className="space-y-6">
            {PERMISSION_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-wide uppercase">
                  {group.label}
                </p>
                <div className="divide-y divide-slate-100 rounded-lg border border-slate-200/80">
                  {group.items.map((p) => {
                    const isBilling = p.key === 'billing.view';
                    const lockedPerm = isBilling && active !== 'Admin';
                    return (
                      <div key={p.key} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium">{p.label}</p>
                          {lockedPerm && (
                            <p className="text-muted-foreground text-[11px]">
                              Зарезервировано для роли Admin
                            </p>
                          )}
                        </div>
                        <Switch
                          checked={matrix[active][p.key]}
                          disabled={lockedPerm}
                          onCheckedChange={(v) => update(active, p.key, v)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingSaveBar
        visible={dirty}
        onSave={() => setSaved(matrix)}
        onDiscard={() => setMatrix(saved)}
      />
    </>
  );
}
