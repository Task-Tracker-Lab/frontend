'use client';

import { FieldDescription, Link, Logo, Spinner } from 'shared/ui';
import { routes } from 'shared/config';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { OTPForm } from 'features/otp-form';
import { useSendCode } from '../model/useSendCode';
import { useLocalStorageDraft } from 'shared/lib/hooks';

type ForgotPasswordStep = 'email' | 'password' | 'otp' | null;

interface ForgotPasswordDraft extends Record<string, unknown> {
  email: string;
  step: ForgotPasswordStep;
}

const DRAFT_KEY = 'drafted-forgot-password';
const DRAFT_TTL_MS = 15 * 60 * 1000;

function ForgotPasswordPage() {
  const router = useRouter();
  const sendCode = useSendCode();
  const { draft, setDraft, clearDraft } = useLocalStorageDraft<ForgotPasswordDraft>(DRAFT_KEY, {
    defaultTTLms: DRAFT_TTL_MS,
    defaultValues: { email: '', step: 'email' },
  });

  const email = draft?.email ?? '';
  const step: ForgotPasswordStep = draft?.step ?? null;

  if (!step) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex h-40 w-full max-w-sm items-center justify-center">
          <Spinner className="size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={routes.home()} className="flex items-center gap-2 self-center font-medium">
          <Logo size="sm" />
        </Link>
        {step === 'email' ? (
          <EmailForm onSuccess={({ email }) => setDraft({ email, step: 'otp' })} />
        ) : null}
        {step === 'otp' && (
          <OTPForm
            autoFocusCode
            email={email}
            query={sendCode}
            onSuccess={() => setDraft({ email, step: 'password' })}
          />
        )}
        {step === 'password' && (
          <PasswordForm
            email={email}
            onSuccess={(_, res) => {
              clearDraft();
              router.replace(routes.auth.signin());
              toast.success(res.message);
            }}
          />
        )}
        <FieldDescription className="text-center">
          Вспомнили пароль?{' '}
          <Link className="font-medium" href={routes.auth.signin()} onClick={clearDraft}>
            Войти
          </Link>
        </FieldDescription>
      </div>
    </div>
  );
}

export { ForgotPasswordPage };
