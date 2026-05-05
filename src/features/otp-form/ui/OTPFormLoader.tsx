import { MutationStatus } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { classNames } from 'shared/lib/utils';
import { Spinner } from 'shared/ui';

interface OTPFormLoaderProps extends ComponentProps<'div'> {
  status: MutationStatus;
}

export function OTPFormLoader({ className, status, ...props }: OTPFormLoaderProps) {
  const spinnerClass =
    status === 'pending' ? 'animate-fade-in' : status === 'idle' ? 'opacity-0' : 'animate-fade-out';

  return (
    <div
      className={classNames('text-muted-foreground flex items-center justify-center gap-2', {}, [
        className,
        spinnerClass,
      ])}
      {...props}
    >
      <Spinner className="size-8" />
    </div>
  );
}
