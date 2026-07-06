'use client';

import { FieldDescription, Link, Logo, Spinner } from 'shared/ui';
import { routes } from 'shared/config';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  DRAFT_TTL_MS,
  OTPForm,
  OTPFormLoader,
  RESEND_CODE_DELAY_MS,
  ResendCodeControl,
} from 'features/otp-form';
import { useSendCode } from '../api/useSendCode';
import { useLocalStorageDraft } from 'shared/lib/hooks';

type ForgotPasswordStep = 'email' | 'password' | 'otp' | null;

interface ForgotPasswordDraft extends Record<string, unknown> {
  email: string;
  step: ForgotPasswordStep;
  nextResendAt: string | null;
}

const DRAFT_KEY = 'drafted-forgot-password';

function ForgotPasswordPage() {
  const router = useRouter();
  const sendCode = useSendCode();
  const { draft, setDraft, clearDraft } = useLocalStorageDraft<ForgotPasswordDraft>(DRAFT_KEY, {
    defaultValues: { email: '', step: 'email', nextResendAt: null },
  });

  const email = draft?.email ?? '';
  const step: ForgotPasswordStep = draft?.step ?? null;
  const nextResendAt = draft?.nextResendAt ?? null;

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
          <EmailForm
            mutateOptions={{
              onSuccess: (_res, { email }) =>
                setDraft(
                  {
                    email,
                    step: 'otp',
                    nextResendAt: new Date(Date.now() + RESEND_CODE_DELAY_MS).toISOString(),
                  },
                  DRAFT_TTL_MS
                ),
            }}
          />
        ) : null}
        {step === 'otp' && (
          <OTPForm
            email={email}
            mutation={sendCode}
            mutateOptions={{
              onSuccess: () =>
                setDraft({
                  email,
                  step: 'password',
                  nextResendAt,
                }),
            }}
          >
            <ResendCodeControl
              mutateOptions={{
                onSuccess: (data) =>
                  setDraft({ email, step, nextResendAt: data.nextResendAt }, DRAFT_TTL_MS),
                onError: () => {
                  setDraft({ step: 'email', email, nextResendAt: null });
                },
              }}
              nextResendAt={nextResendAt}
              data={{ email, context: 'reset-password' }}
            />
            <OTPFormLoader status={sendCode.status} />
          </OTPForm>
        )}
        {step === 'password' && (
          <PasswordForm
            email={email}
            mutateOptions={{
              onSuccess: (res) => {
                clearDraft();
                router.replace(routes.auth.signin());
                toast.success(res.message);
              },
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
