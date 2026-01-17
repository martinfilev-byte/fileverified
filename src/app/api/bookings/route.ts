import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Грешка в API Bookings:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const updated = await prisma.booking.update({
      where: { id },
      data: { status }
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update error" }, { status: 500 });
  }
}