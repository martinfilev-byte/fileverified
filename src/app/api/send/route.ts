import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Тези два реда казват на Next.js да не се опитва да рендерира статично този маршрут по време на билд
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Използваме placeholder, за да мине билда успешно
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');

export async function POST(request: Request) {
  // Реалната проверка се случва само когато някой реално натисне бутона на сайта
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Имейл услугата не е конфигурирана' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { fullName, phone, email, makeModel, year, vin, mileage, location, notes, date, time, packageName, packagePrice } = body;

    const data = await resend.emails.send({
      from: 'FileVerified <onboarding@resend.dev>',
      to: ['martin.filev@gmail.com'],
      subject: `Нова резервация: ${makeModel} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Нова заявка от уебсайта</h2>
          <p><strong>Клиент:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Автомобил:</strong> ${makeModel}</p>
          <p><strong>Пакет:</strong> ${packageName}</p>
          <p><strong>Дата/Час:</strong> ${date} в ${time}</p>
          <p><strong>Бележки:</strong> ${notes || 'Няма'}</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}