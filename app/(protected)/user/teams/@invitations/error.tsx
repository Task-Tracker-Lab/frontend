'use client';

import { ErrorState } from 'widgets/error-state';

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <ErrorState
      title="Не удалось загрузить приглашения"
      description="Попробуйте обновить блок приглашений. Если ошибка повторится, обновите страницу."
      actionLabel="Попробовать снова"
      onRetry={() => unstable_retry()}
      className="border"
    />
  );
}
