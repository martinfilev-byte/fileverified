import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Грешка при четене" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Взимаме само полетата, които съществуват в schema.prisma
    const report = await prisma.report.create({
      data: {
        slug: body.slug,
        carModel: body.carModel,
        clientName: body.clientName,
        jsonData: body.jsonData,
        isPublished: body.isPublished || false
      }
    });
    return NextResponse.json(report);
  } catch (error: any) {
    console.error("API POST ERROR:", error);
    return NextResponse.json({ error: error.message || "Грешка при създаване" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, carModel, clientName, jsonData, isPublished } = body;

    const report = await prisma.report.update({
      where: { id: id },
      data: {
        slug,
        carModel,
        clientName,
        jsonData,
        isPublished
      }
    });
    return NextResponse.json(report);
  } catch (error: any) {
    console.error("API PUT ERROR:", error);
    return NextResponse.json({ error: error.message || "Грешка при обновяване" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Липсва ID" }, { status: 400 });
    
    await prisma.report.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Грешка при изтриване" }, { status: 500 });
  }
}