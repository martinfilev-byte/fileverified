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
  Activity
} from "lucide-react"
import GallerySection from "@/components/GallerySection" // Твоят модул

export default function PublicReport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reports`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((r: any) => r.slug === slug);
        if (found && found.isPublished) {
          setReport({ ...found, data: JSON.parse(found.jsonData) });
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-black text-slate-300 tracking-[0.2em] uppercase italic">FileVerified Инспекция...</div>;
  if (!report) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-black text-red-400">ДОКЛАДЪТ НЕ Е НАМЕРЕН</div>;

  // Форматираме пътищата на снимките, за да минават през API-то за файлове
  const formattedImages = (report.data.images || []).map((img: string) => `/api/files?path=${img}`);

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
      
      {/* HEADER (Премиум дизайн) */}
      <div className="bg-white border-b px-6 py-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-blue-700 font-bold mb-3 tracking-wide">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-black">Инспекционен доклад #{report.id.substring(0,8).toUpperCase()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tighter">
              {report.carModel}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-slate-500 font-medium">
              <span className="flex items-center gap-2">Инспекция за: <b className="text-slate-900">{report.clientName}</b></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="font-bold uppercase tracking-tighter">VIN: {report.data.vin || "---"}</span>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-2xl shadow-blue-200">
            <div className="bg-white/20 text-white p-3 rounded-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="text-white">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Финален статус</div>
              <div className="text-2xl font-black uppercase leading-none tracking-tight">ПРОВЕРЕН</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        
        {/* КЛЮЧОВИ КАРТИ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <InfoCard icon={<Calendar className="w-5 h-5"/>} label="Година" value={report.data.year || "---"} />
          <InfoCard icon={<Gauge className="w-5 h-5"/>} label="Пробег" value={`${report.data.mileage} км`} />
          <InfoCard icon={<Fingerprint className="w-5 h-5"/>} label="VIN Номер" value={report.data.vin ? report.data.vin.substring(0,8) + '...' : '---'} />
          <InfoCard icon={<Activity className="w-5 h-5"/>} label="Статус" value="Verified" />
        </div>

        {/* ТВОЯТА ГАЛЕРИЯ (Интегрирана) */}
        <div className="bg-white rounded-[2rem] border p-2 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-6 font-bold text-slate-900 border-b flex items-center justify-between">
            <span className="flex items-center gap-2 uppercase font-black tracking-tighter">
              <Eye className="w-5 h-5 text-emerald-600"/> Фотодоклад ({formattedImages.length} снимки)
            </span>
          </div>
          {/* Подаваме вече готовите линкове */}
          <GallerySection images={formattedImages} />
        </div>

        {/* СЕКЦИИ С ДАННИ */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SectionCard title="Екстериор и ЛКП" icon={<ShieldCheck className="w-6 h-6 text-blue-600"/>}>
            <ExpandableCheckItem 
              text="Дебелина на боята (Micron Measurement)" 
              status="ok" 
              info="ЛКП Данни"
              details={Object.entries(report.data.paintData || {}).map(([label, value]) => ({
                label,
                value: `${value} μm`
              }))}
            />
            <CheckItem text="Проверка за кит и вторични ремонти" status="ok" />
            <CheckItem text="Състояние на фугите и панелите" status="ok" />
          </SectionCard>

          <SectionCard title="Диагностика и Оглед" icon={<Cpu className="w-6 h-6 text-blue-600"/>}>
            <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 italic text-slate-800 font-bold leading-relaxed text-lg shadow-inner">
              {report.data.diagnostics}
            </div>
          </SectionCard>
        </div>

        {/* ЗАКЛЮЧЕНИЕ */}
        <div className="bg-slate-900 text-white rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 opacity-10 rotate-12"><CheckCircle2 size={500} /></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 italic text-blue-400 uppercase tracking-tight">Заключение</h2>
              <p className="text-slate-300 text-xl leading-relaxed mb-10 font-medium">
                {report.data.finalVerdict}
              </p>
              <div className="flex items-center gap-5 border-t border-white/10 pt-10">
                <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/20">М</div>
                <div>
                  <div className="font-black text-xl tracking-tight">Мартин Филев</div>
                  <div className="text-sm text-blue-400 font-black uppercase tracking-widest tracking-tighter">FileVerified Инспектор</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
               <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                  <div className="text-blue-400 font-black mb-2 uppercase text-xs tracking-widest">Професионален статус</div>
                  <p className="text-sm text-slate-300 leading-relaxed font-bold italic">Проверката е извършена със специализирана апаратура за ЛКП и OBD II диагностика.</p>
               </div>
               <a href="/" className="block w-full bg-white text-slate-900 text-center py-6 rounded-[2rem] font-black text-2xl transition-all hover:bg-blue-600 hover:text-white">
                НОВА ИНСПЕКЦИЯ
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

// Помощни компоненти
function InfoCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border-4 border-white shadow-md flex items-center gap-5 hover:shadow-xl transition-all">
      <div className="text-blue-600 bg-blue-50 p-4 rounded-3xl">{icon}</div>
      <div>
        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</div>
        <div className="text-slate-900 font-black text-xl leading-none">{value}</div>
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children }: { title: string, icon: any, children: any }) {
  return (
    <div className="bg-white rounded-[3rem] border-4 border-white shadow-xl overflow-hidden">
      <div className="p-8 border-b flex items-center gap-4 bg-slate-50/50 font-black uppercase text-xs tracking-widest text-slate-400">
        {icon} {title}
      </div>
      <div className="p-8 space-y-6">{children}</div>
    </div>
  )
}

function CheckItem({ text, status, info }: { text: string, status: 'ok' | 'warning' | 'error', info?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-3">
      <div className="flex items-center gap-4">
        <CheckCircle2 className="w-6 h-6 text-blue-500" />
        <span className="text-slate-800 font-bold text-base">{text}</span>
      </div>
      {info && <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">{info}</span>}
    </div>
  )
}

function ExpandableCheckItem({ text, status, info, details }: { text: string, status: any, info?: string, details: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 pb-3">
      <div className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all group" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4">
          <CheckCircle2 className="w-6 h-6 text-blue-500" />
          <span className="text-slate-800 font-black text-base md:text-lg">{text}</span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-300" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 ml-10 space-y-3 bg-slate-50/50 rounded-3xl p-6 border border-slate-100 shadow-inner">
          {details.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm md:text-base border-b border-slate-200/30 pb-2 last:border-0">
              <span className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">{item.label}</span>
              <span className="text-slate-900 font-black">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}