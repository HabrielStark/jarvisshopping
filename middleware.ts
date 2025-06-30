import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware for demo - all routes are public
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};