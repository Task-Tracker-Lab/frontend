import { useId } from 'react';
import {
  Badge,
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

export function DefaultSettings() {
  const roleId = useId();
  const autoJoinId = useId();

  return (
    <CardSection
      className="space-y-4"
      title={
        <span className="flex items-center gap-2">
          Настройки по умолчанию
          <Badge variant="destructive">Не реализовано</Badge>
        </span>
      }
      description="Применяется к новым участникам."
    >
      <Field>
        <FieldLabel htmlFor={roleId}>Роль по умолчанию для новых участников</FieldLabel>
        <Select>
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
        <Input className="input-max-w" id={autoJoinId} placeholder="company.com" />
      </Field>
      <OptionItem
        label="Разрешить автоматический вход по домену"
        hint="Все с email 'company.com' входят автоматически."
        input={(props) => <Switch {...props} />}
      />
    </CardSection>
  );
}
