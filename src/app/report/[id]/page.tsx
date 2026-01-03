"use client"

import React from "react"
import { useParams } from "next/navigation"
import { 
  CheckCircle2, XCircle, Camera, Download, Car, Info, FileText,
  Clock, MapPin, Calendar, Gauge, Phone, ShieldCheck,
  Disc, Activity, Settings, Zap
} from "lucide-react"

export default function UltraDetailedReport() {
  const params = useParams()
  const reportId = params.id

  const data = {
    vin: "WBA7N7140A12345",
    licensePlate: "CB 1234 MH",
    make: "BMW",
    model: "530d xDrive (G30)",
    year: "2018",
    mileage: "142,500 км",
    engine: "3.0L Diesel / 265hp",
    nasLink: "https://your-nas-link.com/share/XYZ",
    inspectionScore: "8.2",
  }

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-20 font-sans text-slate-900">
      {/* ФИКСИРАН ХЕДЪР */}
      <div className="bg-slate-900 text-white sticky top-16 z-40 shadow-2xl border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 p-2 rounded shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight italic">Технически Доклад за Инспекция</h1>
              <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest">Протокол №: {reportId || "02213"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={data.nasLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-black text-xs flex items-center gap-2 transition-all uppercase">
              <Camera className="w-4 h-4" /> Галерия и Видео
            </a>
            <button onClick={() => window.print()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-xs font-black transition-all uppercase flex items-center gap-2">
              <Download className="w-4 h-4" /> Експорт PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-10">
        
        {/* ОСНОВНИ ДАННИ */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden grid grid-cols-2 md:grid-cols-4">
            <DataTile label="Марка" value={data.make} />
            <DataTile label="Модел" value={data.model} />
            <DataTile label="Година" value={data.year} />
            <DataTile label="Пробег" value={data.mileage} />
            <DataTile label="VIN Номер" value={data.vin} colSpan="col-span-2" />
            <DataTile label="Рег. Номер" value={data.licensePlate} />
            <DataTile label="Двигател" value={data.engine} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-emerald-500 p-6 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Крайна Оценка</p>
            <div className="text-6xl font-black text-slate-900 leading-none">{data.inspectionScore}</div>
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mt-2 italic">Препоръчан</p>
          </div>
        </div>

        {/* ДВИГАТЕЛ И ТРАНСМИСИЯ */}
        <Section title="Двигател и Задвижване">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
            <ReportRow label="Масло в двигателя" status="Чисто" ok />
            <ReportRow label="Течове на масло" status="Не се наблюдават" ok />
            <ReportRow label="Охладителна течност" status="Ниво и цвят - ОК" ok />
            <ReportRow label="Турбокомпресор" status="Нормално налягане" ok />
            <ReportRow label="Скоростна кутия" status="Суха / Без течове" ok />
            <ReportRow label="Съединител" status="Работи нормално" ok />
            <ReportRow label="Грешки в компютъра" status="Няма активни" ok />
            <ReportRow label="Тест при движение" status="Преминат успешно" ok />
          </div>
        </Section>

        {/* ИНСПЕКЦИЯ НА ИНТЕРИОР / КАБИНА */}
        <Section title="Инспекция на Купе и Интериор">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
            <ReportRow label="Климатична система" status="Работи отлично" ok />
            <ReportRow label="Ел. стъкла (предни/задни)" status="Работят" ok />
            <ReportRow label="Ел. огледала" status="Ляво - повреда" error />
            <ReportRow label="Тапицерия / Салон" status="Запазена" ok />
            <ReportRow label="Вентилация и Парно" status="Работи" ok />
            <ReportRow label="Шибидах / Панорама" status="Не работи" error />
            <ReportRow label="Мултимедия и Радио" status="Работи" ok />
            <ReportRow label="Интериорно осветление" status="Всички лампи светят" ok />
          </div>
        </Section>

        {/* ШАСИ И ХОДОВА ЧАСТ */}
        <Section title="Шаси и Окачване">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
            <ReportRow label="Предно окачване" status="Без луфтове" ok />
            <ReportRow label="Задно окачване" status="Здрави тампони" ok />
            <ReportRow label="Спирачни дискове" status="30% износване" ok />
            <ReportRow label="Спирачни накладки" status="Нови (предни)" ok />
            <ReportRow label="Корозия по шасито" status="Повърхностна - ОК" ok />
            <ReportRow label="Хидравлични маркучи" status="Здрави" ok />
            <ReportRow label="Амортисьори" status="Сухи и функционални" ok />
            <ReportRow label="Рейка / Накрайници" status="Без забележки" ok />
          </div>
        </Section>

        {/* ГУМИ И КОНСУМАТИВИ */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-3 border-b border-emerald-500">
            <h2 className="font-black uppercase text-sm italic text-white flex items-center gap-2">
              <Disc className="w-4 h-4 text-emerald-400" /> Гуми и Джанти
            </h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-xs font-bold uppercase tracking-tight text-center">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b">
                  <th className="py-4">Позиция</th>
                  <th>Марка и DOT</th>
                  <th>Грайфер (мм)</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TireRow pos="Предна Лява" brand="Michelin / 2023" depth="6.2 мм" />
                <TireRow pos="Предна Дясна" brand="Michelin / 2023" depth="6.2 мм" />
                <TireRow pos="Задна Лява" brand="Michelin / 2023" depth="5.5 мм" />
                <TireRow pos="Задна Дясна" brand="Michelin / 2023" depth="5.5 мм" />
              </tbody>
            </table>
          </div>
        </div>

        {/* СПЕЦИФИКАЦИЯ / ЕКСТРИ (КАТО НА СНИМКАТА) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-3 border-b border-emerald-500">
            <h2 className="font-black uppercase text-sm italic text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" /> Спецификация и Оборудване
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecList>
              <SpecItem label="ABS / ESP" value="ДА" />
              <SpecItem label="Круиз Контрол" value="ДА" />
              <SpecItem label="Адаптивно Окачване" value="НЕ" />
              <SpecItem label="Парктроник" value="ДА" />
            </SpecList>
            <SpecList>
              <SpecItem label="Кожен Салон" value="ДА" />
              <SpecItem label="Навигация" value="ДА" />
              <SpecItem label="Подгрев на седалки" value="ДА" />
              <SpecItem label="LED Фарове" value="ДА" />
            </SpecList>
            <SpecList>
              <SpecItem label="Камера за заден ход" value="ДА" />
              <SpecItem label="Мъртва зона" value="НЕ" />
              <SpecItem label="Ел. Багажник" value="ДА" />
              <SpecItem label="Панорамен покрив" value="ДА" />
            </SpecList>
          </div>
        </div>

        {/* ФУТЪР НА ДОКЛАДА */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-xl border-b-8 border-emerald-500 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center font-black text-white text-2xl shadow-inner">MF</div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Инспектор</p>
              <p className="font-black text-lg">Мартин Филев</p>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">FileVerified.eu</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest text-center md:text-right">Въпроси?</p>
            <a href="tel:0888570037" className="flex items-center gap-3 text-slate-900 font-black text-2xl hover:text-emerald-600 transition-colors">
              <Phone className="w-6 h-6 text-emerald-500 fill-current" /> 0888 57 00 37
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* МАЛКИ КОМПОНЕНТИ ЗА ПОДРЕДБА */

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-3 border-b border-emerald-500">
        <h2 className="font-black uppercase text-sm italic text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function ReportRow({ label, status, ok = false, error = false }: { label: string, status: string, ok?: boolean, error?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors px-2">
      <div className="space-y-0.5">
        <p className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">{label}</p>
        <p className="text-xs font-black text-slate-700 uppercase">{status}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {ok ? 'Изправно' : 'Дефект'}
        </span>
        {ok ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
      </div>
    </div>
  )
}

function DataTile({ label, value, colSpan = "" }: { label: string, value: string, colSpan?: string }) {
  return (
    <div className={`p-4 border-r border-b border-slate-100 last:border-r-0 ${colSpan}`}>
      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{label}</p>
      <p className="text-xs font-black text-slate-900 uppercase leading-none">{value}</p>
    </div>
  )
}

function TireRow({ pos, brand, depth }: { pos: string, brand: string, depth: string }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="py-4 text-slate-400 text-[10px] font-black text-left pl-4">{pos}</td>
      <td className="py-4 text-slate-900 font-black text-sm">{brand}</td>
      <td className="py-4 text-emerald-600 font-black text-sm italic">{depth}</td>
      <td className="py-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
    </tr>
  )
}

function SpecList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
      <span className="text-[10px] font-black uppercase text-slate-500">{label}</span>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${value === 'ДА' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-400'}`}>
        {value === 'ДА' ? '✓' : '-'}
      </span>
    </div>
  )
}