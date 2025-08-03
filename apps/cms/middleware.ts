import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Daftar path yang tidak memerlukan autentikasi
const publicPaths = [
  '/api/auth/signin',
  '/api/auth/callback',
  '/api/auth/session',
  '/api/auth/csrf',
  '/api/auth/providers',
  '/api/auth/signout',
  '/api/proxy',
];

// Fungsi untuk memeriksa apakah path termasuk dalam daftar public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath =>
    path === publicPath || path.startsWith(`${publicPath}/`)
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Jika path adalah API dan termasuk dalam daftar public, izinkan akses
  if (pathname.startsWith('/api/') && isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Jika path adalah file statis, izinkan akses
  if (
    pathname.includes('.') || // File dengan ekstensi
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Cek token autentikasi dengan secret dari environment variable
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET
  });

  // Jika tidak ada token dan bukan halaman login, redirect ke login
  if (!token && pathname !== '/auth/signin') {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Jika ada token dan mengakses halaman login, redirect ke dashboard
  if (token && pathname === '/auth/signin') {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Konfigurasi path yang akan diproses oleh middleware
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth routes (handled by NextAuth.js)
     * 2. /_next (Next.js internals)
     * 3. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
