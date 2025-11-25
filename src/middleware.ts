import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;


  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Jika user belum login, redirect ke /auth
    if (!user) {
      const redirectUrl = new URL('/auth', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Jika user bukan admin, redirect ke /auth
    if (user.email !== ADMIN_EMAIL) {
      const redirectUrl = new URL('/auth', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Jika user sudah login dan akses /auth, redirect ke /admin
  if (request.nextUrl.pathname === '/auth' && user?.email === ADMIN_EMAIL) {
    const redirectUrl = new URL('/admin', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

// Tentukan route mana aja yang pakai middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/auth',
  ],
};