'use client';

import { Link, Logo } from 'shared/ui';
import { routes } from 'shared/config';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { OTPForm } from 'features/otp-form';
import { useSendCode } from '../model/useSendCode';

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<'email' | 'password' | 'otp'>('email');
  const router = useRouter();
  const sendCode = useSendCode();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={routes.home()} className="flex items-center gap-2 self-center font-medium">
          <Logo size="sm" />
        </Link>
        {step === 'email' && (
          <EmailForm
            onSuccess={({ email }) => {
              setEmail(email);
              setStep('otp');
            }}
          />
        )}
        {step === 'otp' && (
          <OTPForm
            autoFocusCode
            email={email}
            query={sendCode}
            onSuccess={() => setStep('password')}
          />
        )}
        {step === 'password' && (
          <PasswordForm
            email={email}
            onSuccess={(_, res) => {
              router.replace(routes.auth.signin());
              toast.success(res.message);
            }}
          />
        )}
      </div>
    </div>
  );
}

export { ForgotPasswordPage };
