import { OAuthManageButton } from './OAuthManageButton';
import { useConnectedAccounts } from '../../../api/useConnectedAccounts';
import { CardSection } from 'shared/ui';

export function AccountSection() {
  const { providers } = useConnectedAccounts();

  return (
    <CardSection
      className="flex flex-col"
      title="Связанные аккаунты"
      description="Управление привязкой к социальным сетям и сервисам"
    >
      {providers?.map((provider) => {
        return (
          <OAuthManageButton
            key={provider.value}
            isLinked={provider.isConnected}
            provider={provider.value}
            label={provider.label}
          />
        );
      })}
    </CardSection>
  );
}
