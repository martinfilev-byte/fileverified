"use client"

import { useMemo, useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  const selectedPackage = useMemo(
    () => PACKAGES.find((p) => p.id === selected)!,
    [selected]
  )

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "", // Вече е тук
    makeModel: "",
    carLink: "",
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price
        }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Заявката е получена!</h1>
        <p className="text-slate-600 mb-8 max-w-md text-lg">
          Благодарим Ви! Мартин Филев ще се свърже с Вас на телефон <strong>{form.phone}</strong> за потвърждение на часа.
        </p>
        <button 
          onClick={() => { setStatus('idle'); setForm({ ...form, date: "", time: "" }) }}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
        >
          НОВА ЗАЯВКА
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-10 py-6 max-w-7xl mx-auto">
      <div className="space-y-3 px-4 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Запази оглед
        </h1>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl">
          Изберете пакет и попълнете данните за автомобила. Мартин ще Ви се обади за финално потвърждение.
        </p>
      </div>

      {/* ПАКЕТИ */}
      <div className="grid gap-6 lg:grid-cols-3 px-4">
        {PACKAGES.map((p) => {
          const active = p.id === selected
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={`text-left rounded-3xl border bg-white p-6 shadow-sm transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-xl ${
                active ? "border-emerald-500 ring-4 ring-emerald-50" : "border-slate-100"
              }`}
            >
              {p.highlight && (
                <div className="mb-4 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white uppercase tracking-widest">
                  ПРЕПОРЪЧАН
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-2xl font-black text-slate-900">{p.name}</div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600">{p.price}</div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{p.duration}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">{p.short}</div>
              <div className="mt-5">
                <span className={`inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-black transition-all ${
                  active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-slate-100 text-slate-600"
                }`}>
                  {active ? "ИЗБРАН ПАКЕТ" : "ИЗБЕРИ ТОЗИ ПАКЕТ"}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3 px-4 pb-20">
        <form 
          onSubmit={onSubmit} 
          className="lg:col-span-2 rounded-[2.5rem] border border-slate-100 bg-white p-6 md:p-10 shadow-2xl shadow-slate-200/50 space-y-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Име и фамилия">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Иван Иванов" required />
            </Field>
            <Field label="Телефон">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0888 123 456" required />
            </Field>
            {/* ДОБАВЕНО ПОЛЕ ЗА ИМЕЙЛ */}
            <Field label="Имейл адрес">
              <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="example@mail.com" required />
            </Field>
            <Field label="Марка и модел">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.makeModel} onChange={(e) => update("makeModel", e.target.value)} placeholder="VW Golf 7 GTE" required />
            </Field>
            <Field label="Линк към обява">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium font-bold text-emerald-600" value={form.carLink} onChange={(e) => update("carLink", e.target.value)} placeholder="Mobile.bg / Cars.bg..." required />
            </Field>
            <Field label="Година (по желание)">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="2018" />
            </Field>
            <Field label="VIN (по желание)">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium" value={form.vin} onChange={(e) => update("vin", e.target.value.toUpperCase())} placeholder="WBA..." />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Дата за оглед">
              <input type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-bold" value={form.date} onChange={(e) => update("date", e.target.value)} required />
            </Field>
            <Field label="Предпочитан час">
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button key={slot} type="button" onClick={() => update("time", slot)} className={`rounded-xl border py-3 text-sm font-black transition-all ${form.time === slot ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300"}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label="Допълнителни бележки">
            <textarea className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-slate-900 font-medium min-h-[120px] resize-none" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Какво искате да проверим специфично?" />
          </Field>

          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2">
              ⚠️ Нещо се обърка. Моля, обадете се на 0888 57 00 37.
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'loading'} 
            className="w-full rounded-[1.25rem] bg-emerald-600 hover:bg-emerald-700 px-6 py-6 font-black text-xl text-white shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-7 h-7 animate-spin" /> ИЗПРАЩАНЕ...</>
            ) : (
              "ИЗПРАТИ ЗАЯВКА ЗА ОГЛЕД"
            )}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-[2.5rem] border border-emerald-100 bg-emerald-50/40 p-8 space-y-8 sticky top-24">
            <div className="text-sm font-black text-emerald-800 uppercase tracking-[0.2em]">Обобщение</div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 border border-emerald-100 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Избран Пакет</div>
                <div className="text-xl font-black text-slate-900 leading-tight">{selectedPackage.name}</div>
                <div className="text-base font-bold text-emerald-600 mt-1">{selectedPackage.price} · {selectedPackage.duration}</div>
              </div>
              <div className="rounded-3xl bg-white p-6 border border-emerald-100 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Планирано за</div>
                <div className="text-xl font-black text-slate-900">
                  {form.date ? new Date(form.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long' }) : "—"}
                </div>
                <div className="text-base font-bold text-slate-500 mt-1">
                  {form.time ? `В ${form.time} часа` : "Изберете час"}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-2 block">
      <div className="text-sm font-black text-slate-700 ml-1 uppercase tracking-wider">{label}</div>
      {children}
    </div>
  )
}