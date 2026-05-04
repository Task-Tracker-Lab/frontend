'use client';

import { ComponentProps, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { LocalStorageDraft } from 'shared/lib/classes';
import { useTimer } from 'shared/lib/hooks';
import { classNames, formatTime } from 'shared/lib/utils';
import { Button } from 'shared/ui';
import { DRAFT_TTL_MS, RESEND_CODE_DELAY_MS } from '../model/const';

interface ResendCodeControlProps extends Omit<ComponentProps<'div'>, 'children'> {
  resendDelayMs?: number;
  storageKey?: string;
  storageTtlMs?: number;
}

interface LastSentCodeDraft extends Record<string, unknown> {
  lastSentAt: number;
}

const getTimestampMs = (value?: string | number | Date): number =>
  value === undefined ? Date.now() : new Date(value).getTime();

export function ResendCodeControl(props: ResendCodeControlProps) {
  const {
    className,
    resendDelayMs = RESEND_CODE_DELAY_MS,
    storageKey = 'last-sent-code',
    storageTtlMs = DRAFT_TTL_MS,
    ...divProps
  } = props;

  const lastSentCodeDraft = useMemo(
    () => new LocalStorageDraft<LastSentCodeDraft>(storageKey),
    [storageKey]
  );

  const { isFinished, remainingMs, restart } = useTimer({
    durationMs: resendDelayMs,
    autoStart: false,
  });

  useEffect(() => {
    const draft = lastSentCodeDraft.read();
    const now = getTimestampMs();
    const lastSentAt = draft?.lastSentAt ?? now;

    if (!draft) {
      lastSentCodeDraft.set({ lastSentAt }, storageTtlMs);
    }

    restart(resendDelayMs - (now - lastSentAt));
  }, [lastSentCodeDraft, resendDelayMs, restart, storageTtlMs]);

  const handleResendCode = () => {
    lastSentCodeDraft.set({ lastSentAt: getTimestampMs() }, storageTtlMs);
    restart();
    toast.warning('Функционал в разработке!');
  };

  return (
    <div className={classNames('flex items-center gap-3', {}, [className])} {...divProps}>
      <Button variant="link" onClick={handleResendCode} disabled={!isFinished}>
        Отправить код
      </Button>
      <span
        className={classNames('text-destructive', {}, [
          isFinished ? 'animate-fade-out' : 'animate-fade-in',
        ])}
      >
        {formatTime(remainingMs)}
      </span>
    </div>
  );
}
