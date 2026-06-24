import { type TAuth } from 'entities/auth';
import { StartOauthParams } from 'features/auth/oauth-login';
import { NextRequest, NextResponse } from 'next/server';
import { env, routes } from 'shared/config';

type OAuthParams =
  | {
      success: 'false' | 'true';
      token?: string;
      provider: TAuth.OAuthProvider;
    }
  | StartOauthParams;

const ERROR_MESSAGE = 'Не удалось выполнить авторизацию';

export async function GET(request: NextRequest) {
  const params: Partial<OAuthParams> = Object.fromEntries(request.nextUrl.searchParams);

  //start oauth
  if (
    'provider' in params &&
    'startOAuth' in params &&
    params.startOAuth === 'true' &&
    params.provider
  ) {
    const { provider } = params;
    const redirectUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/oauth/${provider}`;

    return NextResponse.redirect(redirectUrl);
  }

  //exchange token
  if ('token' in params && params.token) {
    try {
      const { token, success, provider } = params;

      if (success === 'false') {
        throw new Error(ERROR_MESSAGE);
      }

      if (!provider) {
        throw new Error('OAuth provider не найден в query параметрах');
      }

      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/oauth/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, provider } satisfies TAuth.ExchangeTokenBody),
      });

      const data = (await response.json()) as TAuth.ExchangeTokenResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || `OAuth exchange завершился с ошибкой (status ${response.status})`
        );
      }

      const successUrl = new URL(routes.user.profile(), env.NEXT_PUBLIC_APP_URL);

      successUrl.searchParams.set('success', 'true');
      successUrl.searchParams.set('message', 'Операция выполнена успешно');

      const res = NextResponse.redirect(successUrl);
      const cookies = response.headers.getSetCookie() ?? [];

      cookies.forEach((cookie) => {
        res.headers.append('Set-Cookie', cookie);
      });

      return res;
    } catch (error) {
      console.error(error instanceof Error ? error.message : ERROR_MESSAGE);
    }
  }

  const errorUrl = new URL(routes.auth.signin(), env.NEXT_PUBLIC_APP_URL);

  errorUrl.searchParams.set('success', 'false');
  errorUrl.searchParams.set('message', ERROR_MESSAGE);

  return NextResponse.redirect(errorUrl);
}
