import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Защитаваме админ панела и API-тата
  const isAdminPath = path.startsWith('/admin') && path !== '/admin/login';
  const isAdminApi = (path.startsWith('/api/reports') || path.startsWith('/api/bookings')) && request.method !== 'GET';

  // Проверка за сесия
  const session = request.cookies.get('admin_session')?.value;

  if (isAdminPath || isAdminApi) {
    if (!session) {
      if (path.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Експортираме по подразбиране, за да спре грешката в Next.js 16
export default middleware;

export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/reports/:path*', 
    '/api/bookings/:path*'
  ],
};