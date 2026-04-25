import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from 'shared/config';
import type { Route } from 'next';

const REFRESH_COOKIE = 'refresh';

const PROTECTED_PREFIXES = [routes.team.root()];
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
    return NextResponse.redirect(new URL(routes.team.root(), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
