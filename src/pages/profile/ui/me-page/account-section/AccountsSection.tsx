import { OAuthManageButton } from './OAuthManageButton';
import { useConnectedAccounts } from '../../../api/useConnectedAccounts';
import { CardSection } from 'shared/ui';

export function AccountSection() {
  const { providers } = useConnectedAccounts();

  return (
    <CardSection
      className="grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 lg:grid-cols-2"
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
