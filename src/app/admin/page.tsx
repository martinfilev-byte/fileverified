"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LogOut, 
  RefreshCcw, 
  ClipboardList, 
  FileSearch, 
  User, 
  Calendar, 
  Clock 
} from "lucide-react"

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
  const pathname = usePathname()

  async function load() {
    setErr("")
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" })
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login"
          return
        }
        setErr("Неуспешно зареждане.")
        return
      }
      const data = await res.json()
      setItems(data)
    } catch (error) {
      setErr("Грешка при връзката със сървъра.")
    }
  }

  async function setStatus(id: string, status: BookingStatus) {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) await load()
    } catch (e) {
      console.error(e)
    }
  }

  // ОПРОСТЕНА И РАБОТЕЩА ФУНКЦИЯ ЗА ИЗХОД
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    // window.location.href форсира пълно презареждане и активира Middleware-а
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    load()
  }, [])

  return (
    <section className="space-y-8 pb-20">
      {/* TABS NAVIGATION */}
      <div className="bg-white rounded-[2rem] p-2 border border-slate-200 shadow-sm flex items-center gap-2 max-w-fit">
        <Link href="/admin" className="bg-emerald-600 text-white flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-200">
          <ClipboardList size={16} /> Заявки
        </Link>
        <Link href="/admin/reports" className="text-slate-400 hover:text-slate-600 flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
          <FileSearch size={16} /> Инспекции
        </Link>
      </div>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Заявки</h1>
          <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em]">FileVerified Admin Terminal</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={load} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-xs uppercase text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <RefreshCcw size={16} className="text-emerald-600" /> Refresh
          </button>
          <button onClick={logout} className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-6 py-3 rounded-2xl font-black text-xs uppercase text-rose-600 hover:bg-rose-100 transition-all shadow-sm">
            <LogOut size={16} /> Изход
          </button>
        </div>
      </div>

      {err && <div className="p-6 bg-rose-50 border-2 border-rose-100 text-rose-600 rounded-3xl font-black uppercase text-center text-sm">{err}</div>}

      <div className="grid gap-6">
        {items.map((b) => (
          <div key={b.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              <div className="space-y-6 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">{b.pkgName}</div>
                  <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">{new Date(b.createdAt).toLocaleDateString("bg-BG")}</div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{b.makeModel}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-600 font-bold"><User size={18} className="text-emerald-500" /><span>{b.fullName}</span> / <a href={`tel:${b.phone}`} className="text-emerald-600">{b.phone}</a></div>
                  <div className="flex items-center gap-3 text-slate-600 font-bold"><Calendar size={18} className="text-emerald-500" /><span>{b.date}</span> <Clock size={18} className="text-emerald-500 ml-2" /><span>{b.time} ч.</span></div>
                </div>
                {b.notes && <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-slate-500 text-sm">"{b.notes}"</div>}
              </div>
              <div className="lg:w-80">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className={`text-center py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-sm mb-4 ${
                    b.status === 'new' ? 'bg-blue-600 text-white' : b.status === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-slate-400 text-white'
                  }`}>
                    {STATUS_LABEL[b.status]}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setStatus(b.id, "confirmed")} className="bg-white border border-slate-200 py-3 rounded-xl font-black text-[10px] uppercase text-emerald-600 hover:bg-emerald-50 transition-all">Потвърди</button>
                    <button onClick={() => setStatus(b.id, "done")} className="bg-white border border-slate-200 py-3 rounded-xl font-black text-[10px] uppercase text-slate-600 hover:bg-slate-50 transition-all">Приключи</button>
                    <button onClick={() => setStatus(b.id, "canceled")} className="bg-white border border-slate-200 py-3 rounded-xl font-black text-[10px] uppercase text-rose-500 hover:bg-rose-50 transition-all">Откажи</button>
                    <button onClick={() => setStatus(b.id, "new")} className="bg-white border border-slate-200 py-3 rounded-xl font-black text-[10px] uppercase text-slate-400 hover:bg-slate-50 transition-all">Нова</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}