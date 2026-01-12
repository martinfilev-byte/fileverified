import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path'); // Очакваме нещо като /uploads/audi/file.jpg

  if (!filePath) return new NextResponse('Path missing', { status: 400 });

  try {
    // Взимаме файла от реалната папка на диска
    const absolutePath = path.join(process.cwd(), 'public', filePath);
    const fileBuffer = await readFile(absolutePath);

    // Определяме типа на файла (jpg или png)
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}