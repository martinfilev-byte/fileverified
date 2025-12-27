import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))

  const entered =
    typeof body?.password === "string" ? body.password.trim() : ""

  const expected = (process.env.ADMIN_PASSWORD ?? "").trim()

  if (!entered || entered !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.headers.append(
    "set-cookie",
    "fv_admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000"
  )

  return res
}