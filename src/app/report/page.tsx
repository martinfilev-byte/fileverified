import Link from "next/link"
import fs from 'fs'
import path from 'path'
import GallerySection from "../../components/GallerySection"
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Gauge, 
  Car, 
  ClipboardList, 
  Activity, 
  Zap, 
  Search,
  Eye,
  Wrench,
  Stethoscope
} from "lucide-react"

export default function ReportPage() {
  // АВТОМАТИКА: Прочитаме всички снимки от папката public/images/sample-report
  const imageDir = path.join(process.cwd(), 'public/images/sample-report')
  let imageFiles: string[] = []
  
  try {
    if (fs.existsSync(imageDir)) {
      imageFiles = fs.readdirSync(imageDir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => `/images/sample-report/${file}`)
        .sort();
    }
  } catch (e) {
    console.error("Грешка при четене на снимките:", e)
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER СЪС СТАТУС */}
      <div className="bg-white border-b px-6 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-3 tracking-wide">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest">ИНСПЕКЦИОНЕН ДОКЛАД #20260104-GT3</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Porsche 911 GT3 (992)
            </h1>
            <div className="flex items-center gap-4 mt-3 text-slate-500">
              <span className="flex items-center gap-1.5 font-medium"><Search className="w-4 h-4"/> София, България</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="font-medium underline decoration-emerald-500 underline-offset-4">VIN: WP0ZZZ99ZNS2*****</span>
            </div>
          </div>
          
          <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 flex items-center gap-5">
            <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1">Финален статус</div>
              <div className="text-2xl font-black text-emerald-900 uppercase">ПРЕПОРЪЧАН</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        
        {/* КЛЮЧОВИ ХАРАКТЕРИСТИКИ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <InfoCard icon={<Zap className="w-5 h-5"/>} label="Мощност" value="375 kW / 510 к.с." />
          <InfoCard icon={<Gauge className="w-5 h-5"/>} label="Пробег" value="12,450 км" />
          <InfoCard icon={<Car className="w-5 h-5"/>} label="Година" value="05/2023" />
          <InfoCard icon={<Activity className="w-5 h-5"/>} label="Трансмисия" value="PDK 7-speed" />
        </div>

        {/* ГАЛЕРИЯ */}
        <div className="bg-white rounded-[2rem] border p-2 shadow-xl shadow-slate-200/50">
          <div className="p-6 font-bold text-slate-900 border-b flex items-center justify-between">
            <span className="flex items-center gap-2"><Eye className="w-5 h-5 text-emerald-600"/> Фотодоклад ({imageFiles.length} снимки)</span>
          </div>
          <GallerySection images={imageFiles} />
        </div>

        {/* ДЕТАЙЛНА ПРОВЕРКА ПО СЕКЦИИ */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          <SectionCard title="Екстериор и Каросерия" icon={<ShieldCheck className="w-6 h-6 text-emerald-600"/>}>
            <CheckItem text="Структурни повреди" status="ok" />
            <CheckItem text="Проверка на стъкла и фарове" status="ok" />
            <CheckItem text="Дебелина на боята (всички детайли)" status="ok" info="95-110 μm" />
            <CheckItem text="Проверка на пластмасови елементи" status="ok" />
            <CheckItem text="Функция на врати и ключалки" status="ok" />
            <CheckItem text="Джанти и гуми" status="warning" info="Леко охлузване предна дясна" />
          </SectionCard>

          <SectionCard title="Интериор и Електроника" icon={<ClipboardList className="w-6 h-6 text-emerald-600"/>}>
            <CheckItem text="Състояние на тапицерия и волан" status="ok" />
            <CheckItem text="Мултимедия и Навигация" status="ok" />
            <CheckItem text="Климатична система" status="ok" />
            <CheckItem text="Ел. седалки и подгрев" status="ok" />
            <CheckItem text="OBD II Диагностика - DME статус" status="ok" />
            <CheckItem text="Индикация за грешки на таблото" status="ok" />
          </SectionCard>

          <SectionCard title="Двигател и Ходова част" icon={<Wrench className="w-6 h-6 text-emerald-600"/>}>
            <CheckItem text="Ниво и състояние на масло" status="ok" />
            <CheckItem text="Охладителна система (Течове)" status="ok" />
            <CheckItem text="Спирачна система (Дискове/Накладки)" status="ok" />
            <CheckItem text="Турбокомпресор / Изпускателна система" status="ok" />
            <CheckItem text="Окачване и амортисьори" status="ok" />
            <CheckItem text="Скоростна кутия (Превключване)" status="ok" />
          </SectionCard>

          <SectionCard title="Резултати от тест драйв" icon={<Stethoscope className="w-6 h-6 text-emerald-600"/>}>
            <CheckItem text="Студен старт на двигателя" status="ok" />
            <CheckItem text="Поведение на пътя (Вибрации)" status="ok" />
            <CheckItem text="Ускорение и спиране" status="ok" />
            <CheckItem text="Шум в купето при скорост" status="ok" />
            <CheckItem text="Система за завиване (Rear steering)" status="ok" />
          </SectionCard>

        </div>

        {/* ЗАКЛЮЧЕНИЕ */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic">Обобщение от инспектора</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Автомобилът е в перфектно техническо и визуално състояние. Изключително рядък екземпляр с реални километри и пълна сервизна история в Porsche. Няма признаци за участия в инциденти или тежки ремонти.
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xl">М</div>
                <div>
                  <div className="font-bold">Мартин Филев</div>
                  <div className="text-sm text-slate-400">Главен инспектор, FileVerified</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
               <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-emerald-400 font-bold mb-2 uppercase text-xs">Защо да го купите?</div>
                  <p className="text-sm text-slate-300">Гарантиран произход, отлично състояние на спирачките и гумите, безупречна диагностика.</p>
               </div>
               <Link href="/book" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-emerald-500/20">
                ЗАЯВИ ПРОВЕРКА ЗА ТВОЯ КОЛА
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function SectionCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 border-b flex items-center gap-3 bg-slate-50/50">
        {icon}
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  )
}

function CheckItem({ text, status, info }: { text: string, status: 'ok' | 'warning' | 'error', info?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
      <div className="flex items-center gap-3">
        {status === 'ok' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
        <span className="text-slate-700 font-medium text-sm md:text-base">{text}</span>
      </div>
      {info && <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-tighter">{info}</span>}
    </div>
  )
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="text-emerald-600 bg-emerald-50 p-3 rounded-2xl">{icon}</div>
      <div>
        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</div>
        <div className="text-slate-900 font-bold text-lg">{value}</div>
      </div>
    </div>
  )
}