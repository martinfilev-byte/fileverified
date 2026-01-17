import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let filePath = searchParams.get('path'); 

  if (!filePath) return new NextResponse('Path missing', { status: 400 });

  try {
    // Премахваме водеща наклонена черта, ако има такава, за да не объркаме path.join
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    const absolutePath = path.join(process.cwd(), 'public', cleanPath);

    if (!existsSync(absolutePath)) {
      console.error(`Файлът не е намерен на диска: ${absolutePath}`);
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(absolutePath);
    const ext = path.extname(cleanPath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Грешка при четене на файл:", error);
    return new NextResponse('Error reading file', { status: 500 });
  }
}