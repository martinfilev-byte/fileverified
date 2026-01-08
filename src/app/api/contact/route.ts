import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    
    const { 
      fullName, email, phone, makeModel, carLink, 
      year, vin, date, time, notes, packageName, packagePrice 
    } = body;

    const adminRes = await resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'],
      replyTo: email || undefined, 
      subject: `Нова резервация: ${makeModel} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Нова заявка за проверка</h2>
          <hr />
          <p><strong>Пакет:</strong> ${packageName} (${packagePrice})</p>
          <p><strong>Клиент:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Имейл:</strong> ${email}</p>
          <br />
          <p><strong>Автомобил:</strong> ${makeModel}</p>
          <p><strong>Линк:</strong> <a href="${carLink}">${carLink}</a></p>
          <p><strong>Дата/Час:</strong> ${date} в ${time} ч.</p>
        </div>
      `
    });

    if (email && email.trim() !== "") {
      await resend.emails.send({
        from: 'FileVerified <info@fileverified.eu>',
        to: [email.trim()],
        subject: `Вашата заявка за оглед е приета - FileVerified.eu`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #059669;">Здравейте, ${fullName}!</h2>
            <p>Вашата заявка за <strong>${makeModel}</strong> беше получена успешно.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}