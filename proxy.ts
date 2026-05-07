import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from 'shared/config';
import type { Route } from 'next';
import { trace } from '@opentelemetry/api';

const REFRESH_COOKIE = 'refresh';

const PROTECTED_PREFIXES = [routes.profile.root(), routes.team.root()];
const PUBLIC_ONLY_ROUTES = [routes.auth.signin(), routes.auth.signup()];

function startsWithOneOf(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname as Route;

  const isProtected = startsWithOneOf(path, PROTECTED_PREFIXES);
  const isPublicOnly = PUBLIC_ONLY_ROUTES.includes(path);

  const hasRefreshCookie = req.cookies.has(REFRESH_COOKIE);

  if (isProtected && !hasRefreshCookie) {
    return NextResponse.redirect(new URL(routes.auth.signin(), req.url));
  }

  if (isPublicOnly && hasRefreshCookie) {
    return NextResponse.redirect(new URL(routes.profile.root(), req.url));
  }

  const response = NextResponse.next();
  const current = trace.getActiveSpan();

  // set server-timing header with traceparent
  if (current) {
    response.headers.set(
      'server-timing',
      `traceparent;desc="00-${current.spanContext().traceId}-${current.spanContext().spanId}-01"`
    );
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
