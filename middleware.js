import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/orders', '/checkout', '/kitchen'];

export function middleware(request) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set(
      'next',
      `${pathname}${request.nextUrl.search}`
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};