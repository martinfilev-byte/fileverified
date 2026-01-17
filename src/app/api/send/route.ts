import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// Инициализираме Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error("ГРЕШКА: RESEND_API_KEY липсва в обкръжението.");
      return NextResponse.json({ error: 'Имейл услугата не е конфигурирана' }, { status: 500 });
    }

    const body = await request.json();
    const { 
      fullName, email, phone, makeModel, carLink, 
      year, vin, date, time, notes, packageName, packagePrice 
    } = body;

    // 1. ЗАПИС В POSTGRESQL БАЗАТА
    try {
      await prisma.booking.create({
        data: {
          pkgName: packageName || "Standard",
          date: date || "",
          time: time || "",
          fullName: fullName || "Анонимен",
          phone: phone || "",
          email: email || "",
          makeModel: makeModel || "",
          year: year || "",
          vin: vin || "",
          notes: notes || "",
          status: "new"
        }
      });
      console.log("Успешен запис на заявката в базата.");
    } catch (dbErr) {
      console.error("Грешка при запис в базата:", dbErr);
      // Продължаваме с имейла, дори ако базата се провали
    }

    // 2. ИЗПРАЩАНЕ НА ИМЕЙЛ ДО АДМИН (Мартин)
    const adminEmail = await resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'],
      replyTo: email || undefined,
      subject: `Нова резервация: ${makeModel} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #059669;">Нова заявка от сайта</h2>
          <p><strong>Клиент:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Кола:</strong> ${makeModel}</p>
          <p><strong>Пакет:</strong> ${packageName} (${packagePrice})</p>
          <p><strong>Дата/Час:</strong> ${date} в ${time} ч.</p>
          <hr />
          <p><strong>Линк:</strong> <a href="${carLink}">${carLink}</a></p>
          <p><strong>Бележки:</strong> ${notes || 'Няма'}</p>
        </div>
      `
    });

    if (adminEmail.error) {
      console.error("Грешка при изпращане на имейл:", adminEmail.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Критична грешка в API Route:", error);
    return NextResponse.json({ error: 'Сървърна грешка' }, { status: 500 });
  }
}