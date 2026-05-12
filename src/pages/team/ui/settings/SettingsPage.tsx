'use client';

import { useState } from 'react';
import { FloatingSaveBar } from 'shared/ui';
import { type SettingsValues } from '../../model/types';
import { WorkspaceIdentity } from './WorkspaceIdentity';
import { DefaultSettings } from './DefaultSettings';
import { InviteSecurity } from './InviteSecurity';
import { DangerZone } from './DangerZone';

const INITIAL: SettingsValues = {
  teamName: 'Acme Inc.',
  slug: 'acme',
  defaultRole: 'Member',
  autoJoin: false,
  autoJoinDomain: 'acme.io',
  linkExpiration: '7d',
  requireApproval: true,
};

export function Settings() {
  const [settings, setSettings] = useState(INITIAL);
  const [saved, setSaved] = useState(INITIAL);
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);

  const set = <K extends keyof SettingsValues>(k: K, v: SettingsValues[K]) =>
    setSettings((s) => ({ ...s, [k]: v }));

  return (
    <>
      <div className="space-y-5">
        <WorkspaceIdentity settings={settings} set={set} />
        <DefaultSettings settings={settings} set={set} />
        <InviteSecurity settings={settings} set={set} />
        <DangerZone teamName={settings.teamName} slug={settings.slug} />
      </div>

      <FloatingSaveBar
        visible={dirty}
        onSave={() => setSaved(settings)}
        onDiscard={() => setSettings(saved)}
      />
    </>
  );
}
