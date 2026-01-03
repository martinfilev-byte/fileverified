"use client"

import React from "react"
import { useParams } from "next/navigation"
import { 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Download, 
  Car, 
  Info, 
  FileText,
  Clock,
  MapPin,
  Calendar,
  Gauge,
  Phone // Добавено тук, за да изчезне грешката
} from "lucide-react"

export default function LKWStyledReport() {
  const params = useParams()
  const reportId = params.id

  // Примерни данни в стила на LKW Store
  const data = {
    vin: "WBA7N7140A12345",
    licensePlate: "CB 1234 MH",
    make: "BMW",
    model: "530d xDrive (G30)",
    year: "2018",
    mileage: "142,500 км",
    fuel: "Diesel",
    engine: "3.0L / 265hp",
    color: "Black Sapphire Metallic",
    location: "София",
    inspectionDate: "03.01.2026",
    nasLink: "https://your-nas-link.com/share/XYZ",
    summaryStatus: "ПРЕПОРЪЧАН",
    inspectionScore: "7.5 / 10",
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-20 font-sans">
      {/* TOP HEADER */}
      <div className="bg-slate-900 text-white sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="text-emerald-500 w-6 h-6" />
            <div>
              <h1 className="text-lg font-black uppercase tracking-tight leading-none">Доклад #{reportId || "1"}</h1>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{data.make} {data.model}</p>
            </div>
          </div>
          <div className="flex gap-2">
             <a href={data.nasLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-bold text-xs flex items-center gap-2 transition-all uppercase tracking-tighter">
              <Camera className="w-4 h-4" /> Снимки & Видеа
            </a>
            <button onClick={() => window.print()} className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-xs font-bold transition-all uppercase tracking-tighter flex items-center gap-2">
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded shadow-sm border-t-4 border-emerald-500">
            <div className="p-4 border-b flex items-center gap-2 bg-slate-50/50">
              <Car className="w-5 h-5 text-slate-400" />
              <h2 className="font-black text-slate-800 uppercase text-sm tracking-tight">Информация за автомобила</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <InfoBox label="Марка/Модел" value={`${data.make} ${data.model}`} />
              <InfoBox label="VIN" value={data.vin} />
              <InfoBox label="Рег. номер" value={data.licensePlate} />
              <InfoBox label="Година" value={data.year} />
              <InfoBox label="Пробег" value={data.mileage} icon={<Gauge className="w-3 h-3"/>} />
              <InfoBox label="Гориво" value={data.fuel} />
              <InfoBox label="Двигател" value={data.engine} />
              <InfoBox label="Цвят" value={data.color} />
            </div>
          </div>

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center gap-2 bg-slate-50/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h2 className="font-black text-slate-800 uppercase text-sm tracking-tight">Резултати от техническа проверка</h2>
            </div>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-6 py-3 border-b">Компонент / Система</th>
                  <th className="px-6 py-3 border-b">Детайли / Бележки</th>
                  <th className="px-6 py-3 border-b text-center">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <TableRow label="Компютърна диагностика" detail="Няма активни грешки в Engine и ABS модули." status="ok" />
                <TableRow label="Дебелина на лака (Боя)" detail="Преден десен калник пребоядисван (180μm)." status="warn" />
                <TableRow label="Спирачна система" detail="Дискове и накладки в добро състояние." status="ok" />
                <TableRow label="Окачване и шарнири" detail="Без луфтове или напукани тампони." status="ok" />
                <TableRow label="Двигател (Течове)" detail="Сух мотор, без следи от омасляване." status="ok" />
                <TableRow label="Турбо / Дюзи" detail="Стойности в норма при живи данни." status="ok" />
                <TableRow label="Интериор" detail="Нормално износване за 140 хил. км." status="ok" />
                <TableRow label="Гуми (DOT)" detail="Michelin Pilot Sport 4 (DOT 2023)." status="ok" />
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded shadow-sm p-6 text-center border-b-4 border-emerald-500">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 text-center">Оценка на експерта</p>
            <div className="text-5xl font-black text-slate-900 mb-2 italic tracking-tighter">{data.inspectionScore}</div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {data.summaryStatus}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded shadow-sm p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4 border-b border-white/10 pb-2">Експертно мнение</h3>
            <p className="text-sm leading-relaxed text-slate-300 italic">
              "Автомобилът е поддържан редовно. Технически изряден, препоръчва се обслужване на масла и филтри след 5000 км."
            </p>
          </div>

          <div className="bg-white rounded shadow-sm p-4 space-y-4">
            <MetaItem icon={<Calendar className="w-4 h-4" />} label="Дата" value={data.inspectionDate} />
            <MetaItem icon={<MapPin className="w-4 h-4" />} label="Локация" value={data.location} />
            <MetaItem icon={<Clock className="w-4 h-4" />} label="Времетраене" value="90 мин." />
          </div>

          <div className="bg-white rounded shadow-sm p-6 border border-slate-200">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Въпроси относно доклада?</p>
            <div className="space-y-3">
              <a href="tel:0888570037" className="flex items-center gap-3 text-slate-900 font-bold hover:text-emerald-600 transition-colors">
                <Phone className="w-5 h-5 text-emerald-500" /> 0888 57 00 37
              </a>
              <p className="text-xs text-slate-500">Свържете се директно с инспектора, извършил огледа.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) {
  return (
    <div className="border-r border-b p-4 last:border-r-0">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1 flex items-center gap-1">
        {icon} {label}
      </p>
      <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{value}</p>
    </div>
  )
}

function TableRow({ label, detail, status }: { label: string, detail: string, status: 'ok' | 'warn' | 'error' }) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      <td className="px-6 py-4 font-black text-slate-700 uppercase text-[11px] tracking-tight">{label}</td>
      <td className="px-6 py-4 text-slate-500 text-xs">{detail}</td>
      <td className="px-6 py-4 text-center">
        {status === 'ok' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
        ) : (
          <XCircle className="w-5 h-5 text-amber-500 mx-auto" />
        )}
      </td>
    </tr>
  )
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-tighter">
        {icon} {label}
      </div>
      <div className="font-black text-slate-900">{value}</div>
    </div>
  )
}