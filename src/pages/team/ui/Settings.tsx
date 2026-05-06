'use client';

import { useState } from 'react';
import { AlertTriangle, Upload } from 'lucide-react';
import { FloatingSaveBar, Switch } from 'shared/ui';

type Settings = {
  teamName: string;
  slug: string;
  defaultRole: 'Member' | 'Guest' | 'Viewer';
  autoJoin: boolean;
  autoJoinDomain: string;
  linkExpiration: '24h' | '7d' | 'never';
  requireApproval: boolean;
};

const INITIAL: Settings = {
  teamName: 'Acme Inc.',
  slug: 'acme',
  defaultRole: 'Member',
  autoJoin: false,
  autoJoinDomain: 'acme.io',
  linkExpiration: '7d',
  requireApproval: true,
};

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-muted-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

export function Settings() {
  const [settings, setSettings] = useState(INITIAL);
  const [saved, setSaved] = useState(INITIAL);
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    setSettings((s) => ({ ...s, [k]: v }));

  return (
    <>
      <div className="space-y-5">
        <Section
          title="Идентификация рабочего пространства"
          description="Публичная информация о команде."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[120px_1fr]">
            <div>
              <label className="text-muted-foreground mb-2 block text-xs font-medium">
                Логотип команды
              </label>
              <button className="hover:border-primary/40 hover:text-primary text-muted-foreground flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 transition">
                <Upload size={16} />
                <span className="text-[10px] font-medium">Загрузить</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Название команды">
                <input
                  className={inputCls}
                  value={settings.teamName}
                  onChange={(e) => set('teamName', e.target.value)}
                />
              </Field>
              <Field label="URL рабочего пространства">
                <div className="focus-within:border-primary focus-within:ring-primary/30 flex items-stretch overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:ring-2">
                  <span className="text-muted-foreground flex items-center bg-slate-50 px-3 text-xs">
                    app.acme.io/
                  </span>
                  <input
                    className="text-muted-foreground placeholder:text-muted-foreground flex-1 px-2 py-2 text-sm focus:outline-none"
                    value={settings.slug}
                    onChange={(e) =>
                      set('slug', e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())
                    }
                  />
                </div>
              </Field>
            </div>
          </div>
        </Section>

        {/* Membership defaults */}
        <Section title="Настройки по умолчанию" description="Применяется к новым участникам.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Роль по умолчанию для новых участников">
              <select
                className={inputCls}
                value={settings.defaultRole}
                onChange={(e) => set('defaultRole', e.target.value as Settings['defaultRole'])}
              >
                <option>Member</option>
                <option>Guest</option>
                <option>Viewer</option>
              </select>
            </Field>
            <Field label="Домен для автоматического входа">
              <input
                className={inputCls}
                value={settings.autoJoinDomain}
                onChange={(e) => set('autoJoinDomain', e.target.value)}
                placeholder="company.com"
              />
            </Field>
          </div>
          <Row
            title="Разрешить автоматический вход по домену"
            description={`Все с email @${settings.autoJoinDomain || 'company.com'} входят автоматически.`}
            checked={settings.autoJoin}
            onChange={(v) => set('autoJoin', v)}
          />
        </Section>

        {/* Invitation security */}
        <Section title="Безопасность приглашений" description="Настройте поведение приглашений.">
          <Field label="Срок действия ссылки приглашения">
            <select
              className={`${inputCls} md:max-w-xs`}
              value={settings.linkExpiration}
              onChange={(e) => set('linkExpiration', e.target.value as Settings['linkExpiration'])}
            >
              <option value="24h">Истекает через 24 часа</option>
              <option value="7d">Истекает через 7 дней</option>
              <option value="never">Не истекает</option>
            </select>
          </Field>
          <Row
            title="Требовать одобрения администратора"
            description="Все новые приглашения должны быть одобрены администратором перед активацией."
            checked={settings.requireApproval}
            onChange={(v) => set('requireApproval', v)}
          />
        </Section>

        {/* Danger zone */}
        <div className="rounded-xl border border-red-200/70 bg-red-50/30 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle size={16} />
            </div>
            <div className="flex-1">
              <h3 className="text-muted-foreground text-sm font-semibold">Опасная зона</h3>
              <p className="text-muted-foreground mt-1 text-xs">
                Навсегда удалить это рабочее пространство со всеми проектами, задачами и данными.
                Действие необратимо.
              </p>
            </div>
            <button className="rounded-lg border border-red-300 px-3.5 py-2 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-600 hover:text-white">
              Удалить рабочее пространство
            </button>
          </div>
        </div>
      </div>

      <FloatingSaveBar
        visible={dirty}
        onSave={() => setSaved(settings)}
        onDiscard={() => setSettings(saved)}
      />
    </>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl border border-slate-200/80 p-6">
      <div className="mb-5">
        <h3 className="text-muted-foreground text-sm font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-muted-foreground mb-1.5 block text-xs font-medium">{label}</span>
      {children}
    </label>
  );
}

function Row({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200/80 bg-white px-4 py-3">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
