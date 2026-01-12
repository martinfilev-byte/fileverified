import { NextResponse } from "next/server";
import { mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

// Увеличаваме лимитите за обработка на големи снимки от iPhone
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const slug = formData.get("slug") as string;

    if (!slug) {
      return NextResponse.json({ error: "Липсва линк (slug) за създаване на папка." }, { status: 400 });
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Няма избрани файлове." }, { status: 400 });
    }

    // Дефинираме пътя до папката
    const uploadDir = path.join(process.cwd(), "public", "uploads", slug);
    
    // Създаваме папката, ако не съществува
    await mkdir(uploadDir, { recursive: true });

    const uploadedPaths: string[] = [];

    for (const file of files) {
      // Превръщаме файла в Buffer за обработка с Sharp
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Генерираме име на файла (винаги .webp за максимална лекота на сайта)
      const filename = `${Date.now()}-${file.name.split('.')[0].replaceAll(" ", "_")}.webp`;
      const filepath = path.join(uploadDir, filename);

      // ОБРАБОТКА:
      // 1. Resize до макс 1920px ширина (Full HD е предостатъчно за уеб)
      // 2. Конвертиране в WebP с 80% качество (осигурява супер малък размер)
      await sharp(buffer)
        .resize(1920, 1080, { 
          fit: 'inside', 
          withoutEnlargement: true // Ако снимката е по-малка, не я разпъвай
        })
        .webp({ quality: 80 })
        .toFile(filepath);

      // Записваме пътя за базата данни
      uploadedPaths.push(`/uploads/${slug}/${filename}`);
    }

    return NextResponse.json({ 
      success: true, 
      paths: uploadedPaths 
    });

  } catch (error: any) {
    console.error("Грешка при качване и обработка:", error);
    return NextResponse.json({ 
      error: "Грешка при обработка на изображенията: " + error.message 
    }, { status: 500 });
  }
}