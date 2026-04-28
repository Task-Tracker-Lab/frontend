'use client';

import { OTPForm } from 'features/otp-form';
import { ComponentProps } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthHttp, TAuth } from 'entities/auth';

function CodeForm(props: Omit<ComponentProps<typeof OTPForm>, 'query'>) {
  const sendCode = useMutation({
    mutationFn: (data: TAuth.ResetPasswordVerifyBody) => {
      return AuthHttp.resetPasswordVerify(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  return <OTPForm query={sendCode} {...props} />;
}

export { CodeForm };
