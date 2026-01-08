import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // Изпращаме мейл само до теб (Мартин), тъй като тук не събираме мейл от клиента
    const adminRes = await resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'],
      subject: `Бързо запитване от ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #059669;">Ново съобщение от контактната форма</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Клиент:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <br />
          <p><strong>Съобщение:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            ${message}
          </div>
          <br />
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #6b7280;">Това съобщение е изпратено през контактната форма на fileverified.eu</p>
        </div>
      `
    });

    console.log("Contact email sent:", adminRes);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Contact Route Error:", error);
    return NextResponse.json({ error: error.message || 'Грешка при изпращането' }, { status: 500 });
  }
}