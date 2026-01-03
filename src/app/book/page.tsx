"use client"

import { useMemo, useState } from "react"

type PackageId = "Standard" | "Premium" | "PremiumEV"

const PACKAGES: Array<{
  id: PackageId
  name: string
  price: string
  duration: string
  short: string
  highlight?: boolean
}> = [
  {
    id: "Standard",
    name: "Standard",
    price: "100 Euro",
    duration: "60–75 мин",
    short: "Базова проверка + диагностика",
  },
  {
    id: "Premium",
    name: "Premium",
    price: "250 Euro",
    duration: "90–120 мин",
    short: "Най-добрият баланс (препоръчано)",
    highlight: true,
  },
  {
    id: "PremiumEV",
    name: "PremiumEV",
    price: "300 Euro",
    duration: "120–150 мин",
    short: "Максимално подробно + доклад",
  },
]

const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00"]

export default function BookPage() {
  const [selected, setSelected] = useState<PackageId>("Premium")
  const selectedPackage = useMemo(
    () => PACKAGES.find((p) => p.id === selected)!,
    [selected]
  )

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    makeModel: "",
    year: "",
    vin: "",
    mileage: "",
    location: "",
    notes: "",
    date: "",
    time: "",
  })

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Online booking temporarily disabled (no backend/storage yet)
  const bookingEnabled = false

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Keep UX clean: no errors, no fake submission
    alert("Онлайн запазването ще бъде активно съвсем скоро.")
  }

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          ℹ️ Онлайн запазването е временно изключено
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Запази оглед
        </h1>
        <p className="text-slate-600 text-lg">
          Избери пакет, дата и час, и попълни данните. Потвърждението е ръчно (по
          телефон).
        </p>
      </div>

      {/* Пакети */}
      <div className="grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((p) => {
          const active = p.id === selected
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={[
                "text-left rounded-2xl border bg-white p-6 shadow-sm transition",
                "hover:-translate-y-0.5 hover:shadow-md",
                active ? "border-emerald-300 ring-2 ring-emerald-100" : "",
              ].join(" ")}
            >
              {p.highlight && (
                <div className="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Препоръчан
                </div>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <div className="text-2xl font-bold text-slate-900">{p.name}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {p.price}
                  </div>
                  <div className="text-xs text-slate-500">{p.duration}</div>
                </div>
              </div>

              <div className="mt-2 text-sm text-slate-600">{p.short}</div>

              <div className="mt-4">
                <span
                  className={[
                    "inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold",
                    active
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-50 text-slate-900",
                  ].join(" ")}
                >
                  {active ? "Избран пакет" : "Избери"}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Форма + обобщение */}
      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={onSubmit}
          className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Име и фамилия">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
              />
            </Field>

            <Field label="Телефон">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </Field>

            <Field label="Имейл (по желание)">
              <input
                type="email"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>

            <Field label="Марка и модел">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.makeModel}
                onChange={(e) => update("makeModel", e.target.value)}
                required
              />
            </Field>

            <Field label="Година (по желание)">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
              />
            </Field>

            <Field label="VIN (по желание)">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.vin}
                onChange={(e) => update("vin", e.target.value.toUpperCase())}
              />
            </Field>

            <Field label="Пробег (по желание)">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.mileage}
                onChange={(e) => update("mileage", e.target.value)}
              />
            </Field>

            <Field label="Локация (по желание)">
              <input
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </Field>
          </div>

          {/* Дата и час */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Дата за оглед">
              <input
                type="date"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
            </Field>

            <Field label="Час">
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update("time", slot)}
                    className={[
                      "rounded-lg border px-3 py-2 text-sm font-medium transition",
                      form.time === slot
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label="Бележки (по желание)">
            <textarea
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100 min-h-[110px]"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </Field>

          <button
            type="submit"
            disabled={!bookingEnabled}
            aria-disabled={!bookingEnabled}
            title="Онлайн запазването ще бъде активно съвсем скоро."
            className={[
              "w-full rounded-xl px-6 py-3 font-semibold text-white transition",
              bookingEnabled
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-slate-300 cursor-not-allowed",
            ].join(" ")}
          >
            Изпрати заявка
          </button>

          <div className="text-sm text-slate-600">
            Онлайн запазването ще бъде активно съвсем скоро.
          </div>
        </form>

        {/* Обобщение */}
        <aside className="rounded-2xl border bg-emerald-50 p-6 space-y-4">
          <div className="text-sm font-semibold text-emerald-800">Обобщение</div>

          <div className="rounded-xl bg-white p-4">
            <div className="text-sm text-slate-500">Пакет</div>
            <div className="text-lg font-bold text-slate-900">
              {selectedPackage.name}
            </div>
            <div className="text-sm text-slate-600">
              {selectedPackage.price} · {selectedPackage.duration}
            </div>
          </div>

          <div className="rounded-xl bg-white p-4">
            <div className="text-sm text-slate-500">Дата и час</div>
            <div className="font-semibold text-slate-900">
              {form.date || "—"} · {form.time || "—"}
            </div>
          </div>

          <div className="text-xs text-slate-600">
            Онлайн запазването ще бъде добавено скоро. Засега потвърждението е
            ръчно (по телефон).
          </div>
        </aside>
      </div>
    </section>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="space-y-2 block">
      <div className="text-sm font-medium text-slate-900">{label}</div>
      {children}
    </label>
  )
}