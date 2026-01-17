"use client"

import { useState, useEffect, use } from "react"
import { 
  CheckCircle2, 
  ShieldCheck, 
  Gauge, 
  Search,
  Eye,
  Cpu,
  ChevronDown,
  ChevronUp,
  Zap,
  Calendar,
  Fingerprint,
  Activity,
  Fuel,
  Settings2,
  Disc,
  CarFront,
  AlertTriangle,
  Info,
  MapPin
} from "lucide-react"
import GallerySection from "@/components/GallerySection"
import { cloneElement } from "react"

export default function PublicReport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/reports/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="font-black text-slate-300 tracking-[0.3em] uppercase italic animate-pulse">FileVerified Анализ...</div>
    </div>
  );

  if (error || !report) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <AlertTriangle size={64} className="text-rose-500 mb-4" />
        <h1 className="text-2xl font-black text-rose-500 uppercase tracking-tighter">
            Докладът не е намерен или не е публикуван за публичен достъп.
        </h1>
        <p className="text-slate-500 mt-2 font-bold">Свържете се с администратор, ако смятате, че това е грешка.</p>
        <a href="/" className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Към началото</a>
    </div>
  );

  const formattedImages = (report.data.images || []).map((img: string) => `/api/files?path=${img}`);
  const isExcellent = report.data.finalVerdict?.toLowerCase().includes('отлич') || report.data.finalVerdict?.toLowerCase().includes('без забележ');

  return (
    <main className="min-h-screen bg-[#F1F5F9] pb-20 font-sans text-slate-900 selection:bg-blue-100">
      <div className="bg-white border-b border-slate-200 px-6 py-12 md:py-20 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none"><ShieldCheck size={400} /></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-blue-700 font-black mb-3 tracking-wide bg-blue-50 w-fit px-4 py-1.5 rounded-full border border-blue-100">
              <ShieldCheck className="w-5 h-5" /><span className="text-[10px] uppercase tracking-[0.2em]">Independent Inspection Report</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase italic">{report.carModel}</h1>
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 mt-6 text-slate-500 font-bold uppercase text-[11px] tracking-widest">
              <span>Инспекция за: <b className="text-slate-900">{report.clientName}</b></span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-2"><Fingerprint size={14}/> VIN: <b className="text-slate-900 font-mono tracking-normal">{report.data.vin || "---"}</b></span>
            </div>
          </div>
          <div className={`rounded-[3rem] p-10 flex items-center gap-6 shadow-2xl border-2 ${isExcellent ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className={`p-4 rounded-2xl ${isExcellent ? 'bg-emerald-500' : 'bg-amber-500'} text-white shadow-lg`}>
              {isExcellent ? <CheckCircle2 className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
            </div>
            <div>
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isExcellent ? 'text-emerald-700' : 'text-amber-700'}`}>Технически Статус</div>
              <div className={`text-3xl font-black uppercase leading-none tracking-tighter ${isExcellent ? 'text-emerald-900' : 'text-amber-900'}`}>{isExcellent ? 'ПРОВЕРЕН' : 'СЪС ЗАБЕЛЕЖКИ'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 space-y-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={<Calendar />} label="Година" value={report.data.year} />
          <StatCard icon={<Gauge />} label="Пробег" value={`${report.data.mileage} км`} />
          <StatCard icon={<Fuel />} label="Гориво" value={report.data.fuel} />
          <StatCard icon={<Settings2 />} label="Кутия" value={report.data.gearbox} />
          <StatCard icon={<Zap />} label="Мощност" value={`${report.data.hp} к.с.`} />
          <StatCard icon={<Activity />} label="Диагностика" value={report.data.ecuErrors ? "Грешки" : "Чиста"} color={report.data.ecuErrors ? "text-rose-600" : "text-emerald-600"} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[3.5rem] border border-slate-200 p-2 shadow-2xl overflow-hidden">
              <div className="p-8 font-black text-slate-900 border-b border-slate-50 flex items-center justify-between">
                <span className="flex items-center gap-3 uppercase text-sm tracking-tighter italic"><Eye className="w-6 h-6 text-blue-600"/> Визуален Доклад ({formattedImages.length} снимки)</span>
              </div>
              <GallerySection images={formattedImages} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SectionCard title="Екстериор и ЛКП" icon={<CarFront size={20} className="text-blue-600"/>}>
                <ExpandableCheckItem text="Измерване дебелина на лака" isOpenDefault={true} details={Object.entries(report.data.paintData || {}).map(([label, value]) => ({ label, value: `${value} μm` }))} />
                <CheckItem text="Оптика и купе" status="ok" info={report.data.exteriorStatus} desc={report.data.exteriorNotes} />
              </SectionCard>
              <SectionCard title="Интериор" icon={<Search size={20} className="text-emerald-600"/>}>
                <CheckItem text="Салон и системи" status="ok" info={report.data.interiorStatus} desc={report.data.interiorNotes} />
              </SectionCard>
            </div>
          </div>

          <div className="space-y-8">
            {/* ПРОМЕНЕНА СЕКЦИЯ: ДИАГНОСТИКА (ВЕЧЕ Е БЯЛА) */}
            <div className="bg-white rounded-[3.5rem] border border-slate-200 p-10 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-slate-100 rotate-12 group-hover:rotate-0 transition-transform duration-1000"><Cpu size={120} /></div>
              <div className="relative z-10">
                <h3 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-8 flex items-center gap-2"><Cpu size={18} className="text-blue-600" /> Компютърна Диагностика</h3>
                <div className={`text-sm font-black uppercase mb-4 px-4 py-2 rounded-xl inline-block ${report.data.ecuErrors ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{report.data.ecuErrors ? 'Открити грешки' : 'Няма активни грешки'}</div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl italic text-slate-700 text-sm leading-relaxed font-medium">{report.data.diagnostics || "Системите са сканирани успешно."}</div>
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-200 shadow-xl relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-3xl shadow-lg rotate-12"><ShieldCheck size={24} /></div>
              <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mb-8 flex items-center gap-2"><Info size={16} /> Експертна присъда</h3>
              <p className="text-slate-900 font-black text-2xl leading-tight italic tracking-tighter mb-10">"{report.data.finalVerdict}"</p>
              <div className="pt-10 border-t border-slate-100 flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center font-black text-2xl text-white">МФ</div>
                <div>
                  <div className="font-black text-xl text-slate-900 tracking-tighter leading-none">Мартин Филев</div>
                  <div className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">FileVerified Lead Inspector</div>
                </div>
              </div>
            </div>

             {/* Бутонът остава тъмен за акцент, кажи ако искаш и него светъл */}
            <a href="https://fileverified.eu" className="flex items-center justify-center w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl transition-all hover:bg-blue-600 hover:scale-[1.02] shadow-2xl active:scale-95">
              НОВА ИНСПЕКЦИЯ
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, label, value, color = "text-blue-600" }: any) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-4 group">
      <div className={`${color} bg-slate-50 p-3 rounded-2xl group-hover:scale-110 transition-transform`}>{cloneElement(icon, { size: 20 })}</div>
      <div>
        <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</div>
        <div className="text-slate-900 font-black text-base md:text-lg leading-none tracking-tighter uppercase italic">{value || "---"}</div>
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children }: any) {
  return (
    <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-8 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">{icon}
        <span className="font-black uppercase text-[11px] tracking-[0.2em] text-slate-500">{title}</span>
      </div>
      <div className="p-8 space-y-6 flex-1">{children}</div>
    </div>
  )
}

function CheckItem({ text, info, desc }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /><span className="text-slate-900 font-black text-sm tracking-tight">{text}</span></div>
        {info && <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase">{info}</span>}
      </div>
      {desc && <p className="ml-8 text-[11px] text-slate-400 font-medium italic leading-relaxed">"{desc}"</p>}
    </div>
  )
}

function ExpandableCheckItem({ text, details, isOpenDefault = false }: any) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-white transition-all" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3"><Activity className="w-5 h-5 text-blue-500" /><span className="text-slate-900 font-black text-sm tracking-tight">{text}</span></div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>
      {isOpen && (
        <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-2 gap-3">
            {details.map((item: any, idx: number) => (
              <div key={idx} className="bg-white px-3 py-2 rounded-xl border border-slate-200/50 flex justify-between items-center">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{item.label}</span>
                <span className="text-slate-900 font-black text-xs">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}