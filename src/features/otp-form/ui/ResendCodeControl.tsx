'use client';

import { ComponentProps } from 'react';
import { useTimer } from 'shared/lib/hooks';
import { classNames, formatTime } from 'shared/lib/utils';
import { Button } from 'shared/ui';
import { RESEND_CODE_DELAY_MS } from '../model/const';
import { useResendCode, UseResendOptions } from '../model/useResend';
import { type TAuth } from 'entities/auth';
import { toast } from 'sonner';

interface ResendCodeControlProps extends Omit<ComponentProps<'div'>, 'children'> {
  resendDelayMs?: number;
  storageTtlMs?: number;
  data: TAuth.ResendCodeBody;
  nextResendAt: string | null;
  mutateOptions?: UseResendOptions;
}

export function ResendCodeControl(props: ResendCodeControlProps) {
  const { className, data, nextResendAt, mutateOptions = {}, ...divProps } = props;

  const initialRemainingMs = nextResendAt
    ? Math.max(0, new Date(nextResendAt).getTime() - new Date().getTime())
    : RESEND_CODE_DELAY_MS;

  const { isFinished, remainingMs, restart } = useTimer({
    durationMs: initialRemainingMs,
    autoStart: initialRemainingMs > 0,
  });

  const resend = useResendCode({
    ...mutateOptions,
    onSuccess: (data, ...args) => {
      mutateOptions.onSuccess?.(data, ...args);
      restart(data.retryAfterSeconds * 1000);
      toast.success(
        data.message || 'Повторный код для восстановления пароля отправлен на вашу почту'
      );
    },
  });

  const handleResendCode = () => {
    resend.mutate(data);
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
