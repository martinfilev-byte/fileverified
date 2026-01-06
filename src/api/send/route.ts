import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
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

    // 1. Мейл до теб (Мартин)
    const adminEmail = resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'],
      replyTo: email, // Позволява ти да отговориш директно на клиента
      subject: `Нова резервация: ${makeModel} - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Нова заявка за проверка на автомобил</h2>
          <hr />
          <p><strong>Пакет:</strong> ${packageName} (${packagePrice})</p>
          <p><strong>Клиент:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Имейл:</strong> ${email}</p>
          <br />
          <p><strong>Автомобил:</strong> ${makeModel}</p>
          <p><strong>Година:</strong> ${year || 'Не е посочена'}</p>
          <p><strong>VIN:</strong> ${vin || 'Не е посочен'}</p>
          <p><strong>Линк:</strong> <a href="${carLink}">${carLink}</a></p>
          <br />
          <p><strong>Планирано за:</strong> ${date} в ${time} часа</p>
          <p><strong>Бележки:</strong> ${notes || 'Няма'}</p>
        </div>
      `
    });

    // 2. Уведомителен мейл до клиента
    const customerEmail = resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: [email],
      subject: `Вашата заявка за оглед е приета - FileVerified.eu`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #059669;">Здравейте, ${fullName}!</h2>
          <p>Благодарим Ви, че избрахте <strong>FileVerified.eu</strong> за проверка на Вашия бъдещ автомобил.</p>
          <p>Вашата заявка за <strong>${makeModel}</strong> беше получена успешно. Мартин Филев ще се свърже с Вас на телефон <strong>${phone}</strong> за финално потвърждение на часа.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; rounded: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Избран пакет:</strong> ${packageName}</p>
            <p style="margin: 0;"><strong>Планирана дата:</strong> ${date}</p>
          </div>

          <p>След извършване на огледа, ще получите детайлния ни доклад директно на този имейл адрес.</p>
          <br />
          <p>Поздрави,<br />Екипът на FileVerified.eu</p>
          <p style="font-size: 12px; color: #666;">Това е автоматично съобщение, потвърждаващо Вашата резервация.</p>
        </div>
      `
    });

    // Изчакваме изпращането и на двата мейла
    await Promise.all([adminEmail, customerEmail]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: 'Грешка при изпращането' }, { status: 500 });
  }
}