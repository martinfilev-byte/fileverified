import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.re_2knLum1N_BgBB1yPSG5rQVazSSpkTwFMb);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, carModel, location, message } = body;

    const data = await resend.emails.send({
      from: 'FileVerified <info@fileverified.eu>',
      to: ['martin.filev@gmail.com'], // Твоят имейл
      subject: `Нова резервация: ${carModel}`,
      html: `
        <h2>Нова заявка за проверка на автомобил</h2>
        <p><strong>Име:</strong> ${name}</p>
        <p><strong>Имейл:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Автомобил:</strong> ${carModel}</p>
        <p><strong>Местоположение:</strong> ${location}</p>
        <p><strong>Съобщение:</strong> ${message}</p>
      `
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Грешка при изпращането' }, { status: 500 });
  }
}