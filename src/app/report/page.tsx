"use client"

import React from "react"
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Camera, 
  Cpu, 
  Settings, 
  ShieldCheck,
  ClipboardList,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

export default function SampleReportPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" /> ПРИМЕРЕН ДОКЛАД
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase">Какво получавате след оглед?</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Подробен цифров доклад със снимков материал, компютърна диагностика и експертно заключение от Мартин Филев.
        </p>
      </div>

      {/* QUICK SUMMARY CARD */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden grid md:grid-cols-3">
        <div className="p-8 bg-slate-900 text-white space-y-4">
          <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">Автомобил</div>
          <div className="text-2xl font-bold leading-tight">BMW 530d xDrive (G30)</div>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Година: 2018</p>
            <p>Пробег (по табло): 142,500 км</p>
            <p>Двигател: 3.0 Diesel, 265hp</p>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs uppercase font-black text-slate-500 mb-2">Обща Оценка</div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>
              <span className="text-xl font-black text-yellow-500 italic">ДОБРА (7/10)</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 p-8 space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" /> Резюме от експерта
          </h3>
          <p className="text-slate-600 leading-relaxed font-medium">
            Автомобилът е в добро общо състояние. Открити са следи от пребоядисване на преден десен калник и броня (козметичен ремонт). 
            Компютърната диагностика показва стара грешка в подгревни свещи. Интериорът съответства на пробега. 
            <span className="text-slate-900 font-bold"> Препоръка: Възможна покупка след договаряне на цената за предстоящо обслужване.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1 text-xs font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg">✓ РЕАЛНИ КИЛОМЕТРИ</span>
            <span className="flex items-center gap-1 text-xs font-black bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg">⚠ ПРЕБОЯДИСАН ДЕТАЙЛ</span>
            <span className="flex items-center gap-1 text-xs font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg">✓ ЗДРАВА ГЕОМЕТРИЯ</span>
          </div>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* EXTERIOR */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 uppercase">Екстериор и Боя</h3>
            <CheckCircle2 className="text-emerald-500" />
          </div>
          <ul className="space-y-4">
            <ReportItem label="Дебелина на лака" value="110-140μm (Норма)" status="ok" />
            <ReportItem label="Пребоядисвани детайли" value="Преден десен калник" status="warn" />
            <ReportItem label="Геометрия (Греди/Кош)" value="Без интервенции" status="ok" />
            <ReportItem label="Стъкла (Оригинални)" value="Всички (2018)" status="ok" />
          </ul>
        </div>

        {/* DIAGNOSTICS */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 uppercase">Диагностика и Електроника</h3>
            <Cpu className="text-blue-500" />
          </div>
          <ul className="space-y-4">
            <ReportItem label="Грешки в Двигател" value="Няма активни" status="ok" />
            <ReportItem label="Грешки в Скорости" value="Няма" status="ok" />
            <ReportItem label="DPF / Филтър твърди частици" value="8г сажди (Много добро)" status="ok" />
            <ReportItem label="Airbag Система" value="Изправна" status="ok" />
          </ul>
        </div>
      </div>

      {/* PHOTO PROOF SECTION (Inspiration from Lemon Squad) */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-2">
          <Camera className="w-6 h-6 text-slate-400" /> Визуални доказателства
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative group cursor-pointer border-4 border-white shadow-md">
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-xs">ВИЖ СНИМКАТА</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-black uppercase">
                Детайл {i}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 text-sm font-medium italic">
          * Всеки реален доклад съдържа между 50 и 100 детайлни снимки.
        </p>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-emerald-600 rounded-[3rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-emerald-200">
        <h2 className="text-3xl font-black uppercase">Искате такъв доклад за Вашата бъдеща кола?</h2>
        <p className="text-emerald-100 max-w-xl mx-auto font-medium">
          Не купувайте "котка в чувал". Мартин Филев ще извърши пълна проверка и ще Ви даде спокойствие при покупката.
        </p>
        <div className="pt-4">
          <Link href="/book" className="bg-white text-emerald-700 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-900 hover:text-white transition-all inline-flex items-center gap-2">
            ЗАПАЗЕТЕ ЧАС СЕГА <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ReportItem({ label, value, status }: { label: string, value: string, status: 'ok' | 'warn' | 'error' }) {
  return (
    <li className="flex justify-between items-start border-b border-slate-50 pb-3">
      <div className="space-y-1">
        <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
      {status === 'ok' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      {status === 'warn' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
      {status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
    </li>
  )
}