import {
  CardSection,
  Field,
  FieldLabel,
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

export function InviteSecurity({ settings, set }: Props) {
  const id = useId();

  return (
    <CardSection
      className="space-y-4"
      title="Безопасность приглашений"
      description="Настройте поведение приглашений."
    >
      <Field>
        <FieldLabel htmlFor={id}>Срок действия ссылки приглашения</FieldLabel>
        <Select
          value={settings.linkExpiration}
          onValueChange={(value) =>
            set('linkExpiration', value as SettingsValues['linkExpiration'])
          }
        >
          <SelectTrigger id={id} className="input-max-w">
            <SelectValue placeholder="Срок действия" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="24h">Истекает через 24 часа</SelectItem>
              <SelectItem value="7d">Истекает через 7 дней</SelectItem>
              <SelectItem value="never">Не истекает</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <OptionItem
        label="Требовать одобрения администратора"
        hint="Все новые приглашения должны быть одобрены администратором перед активацией."
        input={(props) => (
          <Switch
            checked={settings.requireApproval}
            onCheckedChange={(v) => set('requireApproval', v)}
            {...props}
          />
        )}
      />
    </CardSection>
  );
}
