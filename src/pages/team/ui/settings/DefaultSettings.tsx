import {
  CardSection,
  Field,
  FieldLabel,
  Input,
  OptionItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from 'shared/ui';
import { type SettingsSetter, type SettingsValues } from '../../model/types';
import { useId } from 'react';

type Props = {
  settings: SettingsValues;
  set: SettingsSetter;
};

export function DefaultSettings({ settings, set }: Props) {
  const roleId = useId();
  const autoJoinId = useId();

  return (
    <CardSection
      className="space-y-4"
      title="Настройки по умолчанию"
      description="Применяется к новым участникам."
    >
      <Field>
        <FieldLabel htmlFor={roleId}>Роль по умолчанию для новых участников</FieldLabel>
        <Select
          value={settings.defaultRole}
          onValueChange={(value) => set('defaultRole', value as SettingsValues['defaultRole'])}
        >
          <SelectTrigger id={roleId} className="input-max-w">
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Member">Member</SelectItem>
              <SelectItem value="Guest">Guest</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor={autoJoinId}>Домен для автоматического входа</FieldLabel>
        <Input
          className="input-max-w"
          id={autoJoinId}
          value={settings.autoJoinDomain}
          onChange={(e) => set('autoJoinDomain', e.target.value)}
          placeholder="company.com"
        />
      </Field>
      <OptionItem
        label="Разрешить автоматический вход по домену"
        hint={`Все с email @${settings.autoJoinDomain || 'company.com'} входят автоматически.`}
        input={(props) => (
          <Switch
            checked={settings.autoJoin}
            onCheckedChange={(v) => set('autoJoin', v)}
            {...props}
          />
        )}
      />
    </CardSection>
  );
}
