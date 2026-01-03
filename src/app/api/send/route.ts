import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализираме Resend само ако ключът е наличен. 
// Това предотвратява грешката по време на 'npm run build'.
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: Request) {
  // Ако Resend не е инициализиран (няма ключ), връщаме грешка само при заявка.
  if (!resend) {
    console.error("Missing RESEND_API_KEY in environment variables.");
    return NextResponse.json(
      { error: 'Email service configuration missing' }, 
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    
    // Извличаме полетата от формата
    const { 
      fullName, 
      phone, 
      email, 
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

    const { data, error } = await resend.emails.send({
      from: 'FileVerified <onboarding@resend.dev>',
      to: ['martin.filev@gmail.com'],
      subject: `Нова заявка: ${makeModel} - ${fullName}`,
      text: `
        ДЕТАЙЛИ ЗА НОВА ЗАЯВКА (FileVerified.eu)
        ------------------------------------------
        КЛИЕНТ:
        - Име: ${fullName}
        - Телефон: ${phone}
        - Имейл: ${email || 'Не е посочен'}
        
        АВТОМОБИЛ:
        - Марка/Модел: ${makeModel}
        - Линк към обява: ${carLink}
        - Година: ${year || 'Не е посочена'}
        - VIN: ${vin || 'Не е посочен'}
        
        ПЛАН:
        - Пакет: ${packageName}
        - Цена: ${packagePrice}
        
        ЖЕЛАН ЧАС:
        - Дата: ${date}
        - Час: ${time || 'Не е избран'}
        
        БЕЛЕЖКИ:
        ${notes || 'Няма допълнителни бележки'}
        ------------------------------------------
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}