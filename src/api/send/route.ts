import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Деструктурираме всички полета, които идват от формата
    const { 
      fullName, 
      email, // Трябва да е абсолютно същото име като във файла BookPage
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

    // 1. МЕЙЛ ДО МАРТИН
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

    console.log("Admin email sent:", adminRes);

    // 2. МЕЙЛ ДО КЛИЕНТА (САМО АКО ИМА МЕЙЛ)
    // Използваме последователно изпращане (await), за да не прекъсне скрипта
    if (email && email.trim() !== "") {
      const customerRes = await resend.emails.send({
        from: 'FileVerified <info@fileverified.eu>',
        to: [email.trim()],
        subject: `Вашата заявка за оглед е приета - FileVerified.eu`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #059669;">Здравейте, ${fullName}!</h2>
            <p>Благодарим Ви, че избрахте <strong>FileVerified.eu</strong>.</p>
            <p>Вашата заявка за <strong>${makeModel}</strong> беше получена успешно. Мартин Филев ще се свърже с Вас на телефон <strong>${phone}</strong> за потвърждение.</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Избран пакет:</strong> ${packageName}</p>
              <p style="margin: 0;"><strong>Планирана дата:</strong> ${date} в ${time} ч.</p>
            </div>

            <p>Поздрави,<br />Екипът на FileVerified.eu</p>
          </div>
        `
      });
      console.log("Customer email sent:", customerRes);
    } else {
      console.log("No customer email provided, skipping second email.");
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Critical Route Error:", error);
    return NextResponse.json({ error: error.message || 'Грешка при изпращането' }, { status: 500 });
  }
}