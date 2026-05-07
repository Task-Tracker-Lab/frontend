import {
  CardSection,
  Field,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from 'shared/ui';
import { type SettingsSetter, type SettingsValues } from '../../model/types';
import { UploadAvatar } from 'features/upload-avatar';
import { UsersIcon } from 'lucide-react';
import { useId } from 'react';

interface Props {
  settings: SettingsValues;
  set: SettingsSetter;
}

export function WorkspaceIdentity({ settings, set }: Props) {
  const idName = useId();
  const idSlug = useId();

  return (
    <CardSection
      title="Идентификация рабочего пространства"
      description="Публичная информация о команде."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr]">
        <UploadAvatar
          context="team.avatar"
          avatar="hhhh"
          alt="skdskdsk"
          fallback={{
            children: <UsersIcon />,
          }}
        />
        <div className="gap-4 space-y-4">
          <Field className="input-max-w">
            <FieldLabel htmlFor={idName}>Название команды</FieldLabel>
            <Input
              id={idName}
              value={settings.teamName}
              onChange={(e) => set('teamName', e.target.value)}
            />
          </Field>
          <Field className="input-max-w">
            <FieldLabel htmlFor={idSlug}>URL рабочего пространства</FieldLabel>
            <InputGroup>
              <InputGroupAddon>app.acme.io/</InputGroupAddon>
              <InputGroupInput
                id={idSlug}
                value={settings.slug}
                onChange={(e) =>
                  set('slug', e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())
                }
              />
            </InputGroup>
          </Field>
        </div>
      </div>
    </CardSection>
  );
}
