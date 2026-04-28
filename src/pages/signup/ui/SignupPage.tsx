'use client';

import { Link, Logo } from 'shared/ui';
import { SignupForm } from './SignupForm';
import { OTPForm } from 'features/otp-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccessToken } from 'shared/api';
import { routes } from 'shared/config';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { signupConfirm, SignupConfirmBody } from 'entities/auth';
import { z } from 'zod';

function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const sendConfirm = useMutation({
    mutationFn: (data: z.infer<typeof SignupConfirmBody>) => {
      return signupConfirm(data);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={routes.home()} className="flex items-center gap-2 self-center font-medium">
          <Logo size="sm" />
        </Link>

        {!email ? (
          <SignupForm onSuccess={({ email }) => setEmail(email)} />
        ) : (
          <OTPForm
            email={email}
            autoFocusCode
            query={sendConfirm}
            onSuccess={(_, res) => {
              if (res.success) {
                AccessToken.token = res.token;
                router.replace(routes.team.profile());
                if (res.message) {
                  toast.success(res.message);
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export { SignupPage };
