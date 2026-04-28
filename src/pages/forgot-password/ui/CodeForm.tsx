'use client';

import { OTPForm } from 'features/otp-form';
import { ComponentProps } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';
import { resetPasswordVerify, ResetPasswordVerifyBody } from 'entities/auth';

function CodeForm(props: Omit<ComponentProps<typeof OTPForm>, 'query'>) {
  const sendCode = useMutation({
    mutationFn: (data: z.infer<typeof ResetPasswordVerifyBody>) => {
      return resetPasswordVerify(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  return <OTPForm query={sendCode} {...props} />;
}

export { CodeForm };
