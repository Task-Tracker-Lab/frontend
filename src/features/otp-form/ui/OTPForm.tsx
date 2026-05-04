'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputOtp,
  InputOTPGroup,
  InputOTPSlot,
} from 'shared/ui';
import { DefaultError, MutateOptions, UseMutationResult } from '@tanstack/react-query';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ComponentProps, useState } from 'react';
import { CAuth } from 'entities/auth';
import type { OTPFormBody } from '../model/types';
import { classNames } from 'shared/lib/utils';

interface OTPFormProps<TData> extends Omit<ComponentProps<typeof CardContent>, 'onAnimationEnd'> {
  email: string;
  mutation: UseMutationResult<TData, DefaultError, OTPFormBody>;
  mutateOptions?: MutateOptions<TData, DefaultError, OTPFormBody>;
  codeLength?: number;
}

export function OTPForm<TData>(props: OTPFormProps<TData>) {
  const {
    email,
    mutation,
    mutateOptions = {},
    codeLength = CAuth.OTP_LENGTH,
    children,
    ...containerProps
  } = props;
  const { onError, onSuccess, ...restMutateOptions } = mutateOptions;
  const [code, setCode] = useState('');
  const [hasCodeError, setHasCodeError] = useState(false);

  const triggerCodeErrorAnimation = () => {
    setHasCodeError(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHasCodeError(true);
        setCode('');
      });
    });
  };

  const handleCodeChange = (value: string) => {
    if (value.length <= codeLength) {
      setCode(value);
    }

    if (value.length >= codeLength) {
      mutation.mutate(
        { code: value, email },
        {
          onSuccess: (...args) => {
            onSuccess?.(...args);
          },
          onError: (...args) => {
            triggerCodeErrorAnimation();
            onError?.(...args);
          },
          ...restMutateOptions,
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Введите код</CardTitle>
        <CardDescription>Код подтверждения отправлен на вашу почту.</CardDescription>
      </CardHeader>
      <CardContent onAnimationEnd={() => setHasCodeError(false)} {...containerProps}>
        <InputOtp
          containerClassName="justify-center gap-3"
          maxLength={codeLength}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          aria-label={`Код подтверждения из ${codeLength} цифр`}
          value={code}
          onChange={handleCodeChange}
          readOnly={mutation.isPending || mutation.isSuccess}
        >
          <InputOTPGroup
            className={classNames('', {
              'animate-head-shake': hasCodeError,
              'opacity-40': mutation.isPending,
            })}
          >
            {Array.from({ length: codeLength }, (_, index) => (
              <InputOTPSlot
                className={classNames('', {
                  'animate-fade-destructive-input': hasCodeError,
                })}
                key={index}
                index={index}
              />
            ))}
          </InputOTPGroup>
        </InputOtp>
      </CardContent>
      {children ? (
        <CardFooter className="flex items-center justify-between gap-3">{children}</CardFooter>
      ) : null}
    </Card>
  );
}
