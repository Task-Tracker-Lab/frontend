import { Button } from 'shared/ui';

export function FloatingSaveBar({
  visible,
  onSave,
  onDiscard,
}: {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  if (visible) {
    return (
      <div className="animate-slad-in-up border-border fixed inset-x-0 bottom-6 z-50 mx-auto flex w-[min(560px,calc(100%-2rem))] items-center justify-between gap-3 rounded-xl border bg-white/95 px-4 py-3 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)] backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="bg-primary h-2 w-2 rounded-full" />
          <p className="text-card-foreground text-sm font-medium">Есть несохранённые изменения</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onDiscard}>
            Отменить
          </Button>
          <Button onClick={onSave}>Сохранить</Button>
        </div>
      </div>
    );
  }
  return null;
}
