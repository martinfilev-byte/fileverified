import { prisma } from "./prisma";

export type BookingStatus = "new" | "confirmed" | "done" | "canceled";

export async function listBookings() {
  // Взимаме всички от базата, подредени по дата (най-новите отгоре)
  return await prisma.booking.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function addBooking(data: any) {
  return await prisma.booking.create({
    data: {
      pkgName: data.packageName || data.pkgName,
      date: data.date,
      time: data.time,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      makeModel: data.makeModel,
      year: data.year,
      vin: data.vin,
      notes: data.notes,
      status: "new",
    },
  });
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
}