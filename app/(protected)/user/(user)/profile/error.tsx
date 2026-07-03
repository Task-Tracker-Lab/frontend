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
      title="Не удалось загрузить основые настройки профиля"
      description="Попробуйте обновить страницу."
      actionLabel="Попробовать снова"
      onRetry={() => unstable_retry()}
      className="border"
    />
  );
}
