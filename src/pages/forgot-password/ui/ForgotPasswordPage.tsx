'use client';

import { Link, Logo } from 'shared/ui';
import { routes } from 'shared/config';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CodeForm } from './CodeForm';
import { toast } from 'sonner';

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<'email' | 'password' | 'otp'>('email');
  const router = useRouter();

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
          <CodeForm autoFocusCode email={email} onSuccess={() => setStep('password')} />
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
