export type SettingsValues = {
  teamName: string;
  slug: string;
  defaultRole: 'Member' | 'Guest' | 'Viewer';
  autoJoin: boolean;
  autoJoinDomain: string;
  linkExpiration: '24h' | '7d' | 'never';
  requireApproval: boolean;
};

export type SettingsSetter = <K extends keyof SettingsValues>(k: K, v: SettingsValues[K]) => void;
