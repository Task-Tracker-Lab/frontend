import { Button, Spinner } from 'shared/ui';

export function FloatingSaveBar({
  visible,
  onSave,
  onDiscard,
  pending = false,
}: {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  pending?: boolean;
}) {
  if (visible) {
    return (
      <div className="animate-slide-in-up border-border fixed inset-x-0 bottom-6 z-50 mx-auto flex w-[min(560px,calc(100%-2rem))] items-center justify-between gap-3 rounded-xl border bg-white/95 px-4 py-3 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)] backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center">
            {pending ? (
              <Spinner />
            ) : (
              <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            )}
          </div>
          <p className="text-card-foreground text-sm font-medium">
            {pending ? 'Сохранение...' : 'Есть несохранённые изменения.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onDiscard} disabled={pending}>
            Отменить
          </Button>
          <Button onClick={onSave} disabled={pending}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
