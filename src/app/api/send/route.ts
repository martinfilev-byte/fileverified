import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Извличаме всички полета от новата форма
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}