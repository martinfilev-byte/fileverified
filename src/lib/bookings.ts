import fs from "node:fs/promises"
import path from "node:path"

export type BookingStatus = "new" | "confirmed" | "done" | "canceled"

export type Booking = {
  id: string
  createdAt: string
  status: BookingStatus
  pkg: "basic" | "full" | "premium"
  pkgName: string
  date: string
  time: string
  fullName: string
  phone: string
  email?: string
  makeModel: string
  year?: string
  vin?: string
  mileage?: string
  location?: string
  notes?: string
}

const DATA_DIR = process.env.BOOKINGS_DIR ?? "/data"
const FILE_PATH = path.join(DATA_DIR, "bookings.json")

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(FILE_PATH)
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf8")
  }
}

export async function listBookings(): Promise<Booking[]> {
  await ensureFile()
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const items = JSON.parse(raw) as Booking[]
  // newest first
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export async function addBooking(b: Booking): Promise<void> {
  await ensureFile()
  const items = await listBookings()
  items.unshift(b)
  await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2), "utf8")
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  await ensureFile()
  const items = await listBookings()
  const idx = items.findIndex((x) => x.id === id)
  if (idx === -1) return
  items[idx] = { ...items[idx], status }
  await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2), "utf8")
}