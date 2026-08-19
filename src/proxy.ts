import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if we are running on Vercel
  const isVercel = process.env.VERCEL === '1';
  
  // If we are on Vercel and trying to access /management, block it
  if (isVercel && request.nextUrl.pathname.startsWith('/management')) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/management/:path*',
};
