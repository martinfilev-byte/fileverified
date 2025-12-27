"use client"

import { useEffect, useState } from "react"

type BookingStatus = "new" | "confirmed" | "done" | "canceled"

type Booking = {
  id: string
  createdAt: string
  status: BookingStatus
  pkgName: string
  date: string
  time: string
  fullName: string
  phone: string
  makeModel: string
  vin?: string
  notes?: string
}

const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "Нова",
  confirmed: "Потвърдена",
  done: "Приключена",
  canceled: "Отказана",
}

export default function AdminPage() {
  const [items, setItems] = useState<Booking[]>([])
  const [err, setErr] = useState("")

  async function load() {
    setErr("")
    const res = await fetch("/api/bookings", { cache: "no-store" })
    if (!res.ok) {
      if (res.status === 401) window.location.href = "/admin/login"
      setErr("Неуспешно зареждане.")
      return
    }
    setItems(await res.json())
  }

  async function setStatus(id: string, status: BookingStatus) {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    await load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin · Заявки</h1>
          <p className="text-slate-600">Списък с всички заявки за оглед.</p>
        </div>
        <button
          onClick={load}
          className="rounded-xl border bg-white px-4 py-2 font-semibold hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {err && <div className="text-red-600">{err}</div>}

      <div className="space-y-4">
        {items.map((b) => (
          <div key={b.id} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm text-slate-500">
                  {new Date(b.createdAt).toLocaleString("bg-BG")}
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {b.pkgName} · {b.date} · {b.time}
                </div>
                <div className="mt-2 text-slate-700">
                  <span className="font-semibold">{b.fullName}</span> · {b.phone}
                </div>
                <div className="text-slate-600">{b.makeModel}</div>
                {b.vin ? <div className="text-xs text-slate-500">VIN: {b.vin}</div> : null}
                {b.notes ? <div className="mt-2 text-sm text-slate-700">{b.notes}</div> : null}
              </div>

              <div className="min-w-[240px] space-y-2">
                <div className="text-sm text-slate-500">Статус</div>
                <div className="font-semibold text-slate-900">
                  {STATUS_LABEL[b.status]}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStatus(b.id, "confirmed")}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Потвърди
                  </button>
                  <button
                    onClick={() => setStatus(b.id, "done")}
                    className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Приключи
                  </button>
                  <button
                    onClick={() => setStatus(b.id, "canceled")}
                    className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Откажи
                  </button>
                  <button
                    onClick={() => setStatus(b.id, "new")}
                    className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Нова
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="rounded-2xl border bg-white p-6 text-slate-600">
            Няма заявки още.
          </div>
        )}
      </div>
    </section>
  )
}