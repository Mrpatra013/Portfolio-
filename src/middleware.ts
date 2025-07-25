import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Special handling for the 3D-HERO-PAGE directory
  if (request.nextUrl.pathname.includes('/work/3D-HERO-PAGE/')) {
    // Let's rewrite to ensure it's properly handled
    const url = request.nextUrl.clone();
    return NextResponse.rewrite(url);
  }
  
  // Continue with normal handling for other paths
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/work/:path*'],
};
