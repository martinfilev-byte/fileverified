import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    
    // Вземаме паролата от обкръжението
    const adminPassword = process.env.ADMIN_PASSWORD;

    // ЛОГОВЕ ЗА ТЕБ (виж ги в терминала)
    console.log("--- LOGIN ATTEMPT ---");
    console.log("Password entered:", password);
    console.log("Password expected:", adminPassword);

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true });

      // Настройка на бисквитката за локална среда (secure: false)
      response.cookies.set('admin_session', 'true', {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 ден
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Грешна парола' }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: 'Сървърна грешка' }, { status: 500 });
  }
}