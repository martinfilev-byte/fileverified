import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const slug = formData.get("slug") as string;

    console.log(`Започва качване за автомобил: ${slug}, брой файлове: ${files.length}`);

    if (!slug) {
      return NextResponse.json({ error: "Липсва линк (slug). Не мога да създам папка." }, { status: 400 });
    }

    if (!files.length) {
      return NextResponse.json({ error: "Няма избрани файлове." }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", slug);
    
    // Създаваме папката и проверяваме за грешки в правата
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e: any) {
      console.error("Грешка при създаване на папка:", e.message);
      return NextResponse.json({ error: "Нямам права да създам папка в Docker." }, { status: 500 });
    }

    const uploadedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
      const filepath = path.join(uploadDir, filename);

      try {
        await writeFile(filepath, buffer);
        uploadedPaths.push(`/uploads/${slug}/${filename}`);
        console.log(`Успешно записан файл: ${filename}`);
      } catch (writeError: any) {
        console.error("Грешка при запис на файл:", writeError.message);
        return NextResponse.json({ error: `Грешка при запис на ${file.name}` }, { status: 500 });
      }
    }

    return NextResponse.json({ paths: uploadedPaths });
  } catch (error: any) {
    console.error("Глобална грешка в API Upload:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}