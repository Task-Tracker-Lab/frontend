import { useId } from 'react';
import {
  Badge,
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

export function InviteSecurity() {
  const id = useId();

  return (
    <CardSection
      className="space-y-4"
      title={
        <span className="flex items-center gap-2">
          Безопасность приглашений
          <Badge variant="destructive">Не реализовано</Badge>
        </span>
      }
      description="Настройте поведение приглашений."
    >
      <Field>
        <FieldLabel htmlFor={id}>Срок действия ссылки приглашения</FieldLabel>
        <Select>
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
        input={(props) => <Switch {...props} />}
      />
    </CardSection>
  );
}
