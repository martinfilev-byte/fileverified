import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const report = await prisma.report.findFirst({
      where: { 
        slug: slug,
        isPublished: true 
      }
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Връщаме обекта, като парсваме jsonData директно тук
    return NextResponse.json({
      ...report,
      data: JSON.parse(report.jsonData)
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}