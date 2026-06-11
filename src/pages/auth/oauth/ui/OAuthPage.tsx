import { type TAuth } from 'entities/auth';
import { StartOauthParams } from 'features/auth/oauth-login';
import { Route } from 'next';
import { redirect } from 'next/navigation';
import { routes } from 'shared/config';
import { env } from 'shared/config';

type BooleanRaw = 'false' | 'true';
type OAuthParams = {
  success: BooleanRaw;
  message: string;
  access: string;
  provider: TAuth.OAuthProvider;
  isNewUser: BooleanRaw;
} & StartOauthParams;

interface Props {
  searchParams: Promise<Partial<OAuthParams>>;
}

export async function OAuthPage({ searchParams }: Props) {
  const { success, message, provider, startOAuth } = await searchParams;

  if (provider && startOAuth === 'true') {
    redirect(`${env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/${provider}` as Route);
  }

  if (!success) {
    redirect(routes.auth.signin());
  }

  if (success === 'true') {
    redirect(routes.user.profile());
  }

  const errorUrl = message
    ? `${routes.auth.signin()}?oauth_error=1&message=${encodeURIComponent(message)}`
    : routes.auth.signin();

  redirect(errorUrl as Route);
}
