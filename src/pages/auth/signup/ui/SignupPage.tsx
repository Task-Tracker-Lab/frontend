'use client';

import { FieldDescription, Link, Logo, Spinner } from 'shared/ui';
import { SignupForm } from './SignupForm';
import {
  DRAFT_TTL_MS,
  OTPForm,
  OTPFormLoader,
  RESEND_CODE_DELAY_MS,
  ResendCodeControl,
} from 'features/otp-form';
import { useRouter } from 'next/navigation';
import { AccessToken } from 'shared/api';
import { routes } from 'shared/config';
import { toast } from 'sonner';
import { useSignupConfirm } from '../api/useSignupConfirm';
import { useLocalStorageDraft } from 'shared/lib/hooks';

type SignupStep = 'signup' | 'otp' | null;

interface SignupDraft extends Record<string, unknown> {
  email: string;
  step: SignupStep;
  nextResendAt: string | null;
}

const DRAFT_KEY = 'drafted-signup';

function SignupPage() {
  const router = useRouter();
  const sendConfirm = useSignupConfirm();
  const { draft, setDraft, resetDraft, clearDraft } = useLocalStorageDraft<SignupDraft>(DRAFT_KEY, {
    defaultValues: { email: '', step: 'signup', nextResendAt: null },
  });

  const email = draft?.email ?? '';
  const step: SignupStep = draft?.step ?? null;
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

        {step === 'signup' ? (
          <SignupForm
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
        {step === 'otp' ? (
          <OTPForm
            email={email}
            mutation={sendConfirm}
            mutateOptions={{
              onSuccess: (res) => {
                if (res.success) {
                  clearDraft();
                  AccessToken.token = res.token;
                  router.replace(routes.user.root());
                  if (res.message) {
                    toast.success(res.message);
                  }
                }
              },
            }}
          >
            <ResendCodeControl
              mutateOptions={{
                onSuccess: (data) => {
                  setDraft({ email, step, nextResendAt: data.nextResendAt }, DRAFT_TTL_MS);
                },
                onError: () => {
                  setDraft({ step: 'signup', email, nextResendAt: null });
                },
              }}
              nextResendAt={nextResendAt}
              data={{ email, context: 'reset-password' }}
            />
            <OTPFormLoader status={sendConfirm.status} />
          </OTPForm>
        ) : null}
        {step === 'otp' ? (
          <FieldDescription className="text-center">
            Передумали?{' '}
            <Link className="font-medium" href={routes.auth.signup()} onClick={resetDraft}>
              Назад
            </Link>
          </FieldDescription>
        ) : null}
      </div>
    </div>
  );
}

export { SignupPage };
