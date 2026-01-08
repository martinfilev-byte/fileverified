import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Инициализираме Resend само ако има ключ, за да не гърми при 'npm run build'
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(request: Request) {
  // Проверка дали услугата е конфигурирана правилно при самото извикване
  if (!resend) {
    console.error("RESEND_API_KEY is missing");
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    
    const { 
      fullName, 
      email, 
      phone, 
      makeModel, 
      carLink, 
      year, 
      vin, 
      date, 
      time, 
      notes, 
      packageName, 
      packagePrice 
    } = body;

    // 1. ИЗПРАЩАНЕ ДО МАРТИН (Админ)
    const adminRes = await resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'],
      replyTo: email || undefined, 
      subject: `Нова резервация: ${makeModel} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Нова заявка за проверка</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p><strong>Пакет:</strong> <span style="color: #059669; font-weight: bold;">${packageName} (${packagePrice})</span></p>
            <p><strong>Клиент:</strong> ${fullName}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Имейл:</strong> ${email}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
            <p><strong>Автомобил:</strong> ${makeModel}</p>
            <p><strong>Година:</strong> ${year || 'Не е посочена'}</p>
            <p><strong>VIN:</strong> ${vin || 'Не е посочен'}</p>
            <p><strong>Линк към обява:</strong> <a href="${carLink}" style="color: #2563eb;">${carLink}</a></p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
            <p><strong>Желан час:</strong> <span style="font-weight: bold;">${date} в ${time} ч.</span></p>
            <p><strong>Бележки:</strong> ${notes || 'Няма'}</p>
          </div>
        </div>
      `
    });

    if (adminRes.error) {
      console.error("Admin Email Error:", adminRes.error);
    }

    // 2. ИЗПРАЩАНЕ ДО КЛИЕНТА (Потвърждение)
    if (email && email.trim() !== "") {
      const customerRes = await resend.emails.send({
        from: 'FileVerified <info@fileverified.eu>',
        to: [email.trim()],
        subject: `Вашата заявка за оглед е приета - FileVerified.eu`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Здравейте, ${fullName}!</h2>
            <p>Благодарим Ви, че избрахте <strong>FileVerified.eu</strong> за независима проверка на Вашия бъдещ автомобил.</p>
            <p>Вашата заявка за <strong>${makeModel}</strong> беше получена успешно. Мартин Филев ще се свърже с Вас скоро на телефон <strong>${phone}</strong> за финално потвърждение на часа.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #e5e7eb;">
              <h3 style="margin-top: 0; color: #1f2937;">Обобщение на заявката:</h3>
              <p style="margin: 5px 0;"><strong>Пакет:</strong> ${packageName}</p>
              <p style="margin: 5px 0;"><strong>Планирана дата:</strong> ${date} в ${time} часа</p>
            </div>

            <p><strong>Какво следва?</strong></p>
            <ul style="color: #4b5563;">
              <li>Ще потвърдим огледа с Вас и с продавача на автомобила.</li>
              <li>След извършване на проверката, ще изготвим детайлен доклад.</li>
              <li>Ще получите доклада директно на този имейл адрес.</li>
            </ul>
            
            <p style="margin-top: 30px;">Поздрави,<br /><strong>Екипът на FileVerified.eu</strong><br />
            <a href="https://fileverified.eu" style="color: #2563eb; text-decoration: none;">www.fileverified.eu</a></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 11px; color: #9ca3af; text-align: center;">Това е автоматично съобщение. Моля, не отговаряйте директно на него.</p>
          </div>
        `
      });
      
      if (customerRes.error) {
        console.error("Customer Email Error:", customerRes.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Critical Route Error:", error);
    return NextResponse.json({ error: 'Грешка при изпращането' }, { status: 500 });
  }
}