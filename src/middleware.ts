import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '../auth';
export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log(session, 'session');
  if (!session) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    console.log(callbackUrl, 'callbackUrl');
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/product-listing',
};
