'use client';

import { Link, Logo, Spinner } from 'shared/ui';
import { SignupForm } from './SignupForm';
import { OTPForm } from 'features/otp-form';
import { useRouter } from 'next/navigation';
import { AccessToken } from 'shared/api';
import { routes } from 'shared/config';
import { toast } from 'sonner';
import { useSignupConfirm } from '../model/useSignupConfirm';
import { useLocalStorageDraft } from 'shared/lib/hooks';

type SignupStep = 'signup' | 'otp' | null;

interface SignupDraft extends Record<string, unknown> {
  email: string;
  step: SignupStep;
}

const DRAFT_KEY = 'drafted-signup';
const DRAFT_TTL_MS = 15 * 60 * 1000;

function SignupPage() {
  const router = useRouter();
  const sendConfirm = useSignupConfirm();
  const { draft, setDraft, clearDraft } = useLocalStorageDraft<SignupDraft>(DRAFT_KEY, {
    defaultTTLms: DRAFT_TTL_MS,
    defaultValues: { email: '', step: 'signup' },
  });

  const email = draft?.email ?? '';
  const step: SignupStep = draft?.step ?? null;

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
          <SignupForm onSuccess={({ email }) => setDraft({ email, step: 'otp' })} />
        ) : null}
        {step === 'otp' ? (
          <OTPForm
            email={email}
            autoFocusCode
            query={sendConfirm}
            onSuccess={(_, res) => {
              if (res.success) {
                clearDraft();
                AccessToken.token = res.token;
                router.replace(routes.profile());
                if (res.message) {
                  toast.success(res.message);
                }
              }
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { SignupPage };
