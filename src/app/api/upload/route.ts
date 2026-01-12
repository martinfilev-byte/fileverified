import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string;
    const files = formData.getAll("files") as File[];

    if (!slug || files.length === 0) {
      return NextResponse.json({ error: "Липсва slug или файлове" }, { status: 400 });
    }

    // Път до папката: public/uploads/[slug]
    const uploadDir = join(process.cwd(), "public", "uploads", slug);
    
    // Създаваме папката, ако не съществува
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const savedPaths = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Генерираме уникално име за всяка снимка
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const path = join(uploadDir, fileName);
      
      await writeFile(path, buffer);
      
      // Връщаме пътя, който ще се пази в базата
      savedPaths.push(`${slug}/${fileName}`);
    }

    return NextResponse.json({ paths: savedPaths });
  } catch (error) {
    console.error("Грешка при качване:", error);
    return NextResponse.json({ error: "Сървърна грешка при качване" }, { status: 500 });
  }
}

// Важно: Увеличаваме лимита за API-то (само за App Router)
export const config = {
  api: {
    bodyParser: false, // Изключваме стандартния парсер за големи файлове
  },
};