import { CardSection } from 'shared/ui';
import { ErrorState } from 'widgets/error-state';

export function AccountSectionErrorFallback() {
  return (
    <CardSection
      className="flex flex-col"
      title="Связанные аккаунты"
      description="Управление привязкой к социальным сетям и сервисам"
    >
      <ErrorState />
    </CardSection>
  );
}
