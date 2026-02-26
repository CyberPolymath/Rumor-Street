import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and the current path is /home or other protected routes
  if (!session && req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // If user IS signed in and tries to access /auth, redirect to /home
  if (session && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/home/:path*', '/auth', '/portfolio/:path*', '/account/:path*'],
};
