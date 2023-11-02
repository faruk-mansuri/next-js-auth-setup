import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicRoute =
    path === '/signup' ||
    path === '/login' ||
    path === '/verifyEmail' ||
    path === '/forgot-password' ||
    path === '/reset-password';

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/', request.nextUrl));

  if (!isPublicRoute && !token)
    return NextResponse.redirect(new URL('/login', request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  runtime: 'experimental-edge',
  matcher: [
    '/signup',
    '/login',
    '/',
    '/profile/:path*',
    '/verifyEmail',
    '/forgot-password',
    '/reset-password',
  ],
};
