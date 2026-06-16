import { NextRequest, NextResponse } from 'next/server';
import { type TAuth } from 'entities/auth';
import { StartOauthParams } from 'features/auth/oauth-login';
import { routes } from 'shared/config';
import { env } from 'shared/config';
import { redirect } from 'next/navigation';
import { cookies as nextCookies } from 'next/headers';

type BooleanRaw = 'false' | 'true';
type ExchangeParams = { token?: string };
type OAuthParams = {
  success?: BooleanRaw;
  message?: string;
  provider?: TAuth.OAuthProvider;
  isNewUser?: BooleanRaw;
} & StartOauthParams &
  ExchangeParams;

const PROVIDER_KEY = 'provider';

function addResponseSetCookies(response: Response | NextResponse, cookies: string[]) {
  cookies.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });
}

export async function GET(request: NextRequest) {
  const params: Partial<OAuthParams> = Object.fromEntries(request.nextUrl.searchParams);
  const { provider, startOAuth, token } = params;
  const cookieStore = await nextCookies();

  if (provider && startOAuth === 'true') {
    cookieStore.set(PROVIDER_KEY, provider);
    const redirectUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/oauth/${provider}`;
    return NextResponse.redirect(redirectUrl);
  }

  let message = params.message;
  let success = params.success;
  let cookies: string[] = [];
  const APP_URL = request.nextUrl.origin;

  // Exchange token
  const providerFromCookie = cookieStore.get(PROVIDER_KEY)?.value;

  if (token) {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/oauth/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, provider: providerFromCookie }),
      });

      const setCookieHeaders = response.headers.getSetCookie();
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        cookies = setCookieHeaders;
      }

      const data: TAuth.ExchangeTokenResponse = await response.json();
      message = data.message || message;
      success = data.success ? 'true' : 'false';
    } catch {
      success = 'false';
    }
  }
  cookieStore.delete(PROVIDER_KEY);
  // Ошибка
  if (success === 'false') {
    const errorUrl = message
      ? `${APP_URL}${routes.auth.signin()}?error=${encodeURIComponent(message)}`
      : `${APP_URL}${routes.auth.signin()}`;

    const response = NextResponse.redirect(errorUrl);

    addResponseSetCookies(response, cookies);

    return response;
  }

  // Успех
  if (success === 'true') {
    const successUrl = `${APP_URL}${routes.user.profile()}?success=true&message=${encodeURIComponent(message || 'Операция выполнена успешно')}`;

    const response = NextResponse.redirect(successUrl);
    addResponseSetCookies(response, cookies);

    return response;
  }

  // Fallback
  redirect(routes.auth.signin());
}
