import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Пълно и окончателно изтриване на бисквитката
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}