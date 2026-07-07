'use client';

import { ErrorState } from 'widgets/error-state';

export default function Error({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <ErrorState
      title="Не удалось загрузить настройки проекта"
      description="Попробуйте обновить настройки проекта. Если ошибка повторится, обновите страницу."
      actionLabel="Попробовать снова"
      onRetry={() => unstable_retry()}
      className="border"
    />
  );
}
