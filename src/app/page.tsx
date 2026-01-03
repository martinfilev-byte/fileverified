import React from 'react';
import { Camera, Shield, Gauge, Wrench, Search, Car, FileCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black z-0" />
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic italic uppercase">
            File<span className="text-emerald-500">Verified</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto font-light">
            Професионална проверка на автомобили в София. Вижте реалното състояние, спестете си изненадите.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all transform hover:scale-105">
              Заяви проверка
            </a>
            <a href="#gold-standard" className="px-8 py-4 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-all">
              Виж Златния Стандарт
            </a>
          </div>
        </div>
      </section>

      {/* THE GOLD STANDARD SECTION */}
      <section id="gold-standard" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">
              THE <span className="text-emerald-500">GOLD</span> STANDARD
            </h2>
            <p className="text-zinc-500 italic text-lg">Безкомпромисен чек-лист за всяка проверка</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Camera className="text-emerald-500" />, 
                title: "200+ Снимки и Видео", 
                desc: "Детайлен визуален отчет за всяко кътче на колата, включително 360° екстериор и макро снимки на дефекти." 
              },
              { 
                icon: <Search className="text-emerald-500" />, 
                title: "Пълна Диагностика", 
                desc: "Full System Scan на всички модули (Engine, ABS, Airbag) и заснемане на живи данни в реално време." 
              },
              { 
                icon: <Gauge className="text-emerald-500" />, 
                title: "Реални Километри", 
                desc: "Дълбока проверка на историята и софтуерните записи в алтернативни модули като скорости и DPF." 
              },
              { 
                icon: <Wrench className="text-emerald-500" />, 
                title: "Ходова част", 
                desc: "Тест на окачване, спирачки и трансмисия, плюс измерване дълбочината на грайфера на гумите." 
              },
              { 
                icon: <Shield className="text-emerald-500" />, 
                title: "Лак и Боя", 
                desc: "Измерване с професионален дебеломер на всеки панел за установяване на кит и пребоядисвани детайли." 
              },
              { 
                icon: <Car className="text-emerald-500" />, 
                title: "Тест Драйв", 
                desc: "Проверка на поведението на пътя, вибрации при спиране и плавно превключване на предавките." 
              },
              { 
                icon: <FileCheck className="text-emerald-500" />, 
                title: "Документация", 
                desc: "VIN съпоставка на 3+ места и детайлно заснемане на сервизната история и фактури." 
              },
              { 
                icon: <div className="text-emerald-500 font-bold">EV</div>, 
                title: "EV/Hybrid Репорт", 
                desc: "Специализирана диагностика на батерията и SOH (State of Health) отчет за електрически автомобили." 
              },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-zinc-900 bg-black rounded-3xl hover:border-emerald-500/50 transition-all group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 p-12 rounded-[3rem] text-center">
            <h2 className="text-4xl font-black mb-6">Свържете се с Мартин Филев</h2>
            <p className="text-zinc-400 mb-10 text-lg">
              Вашият доверен партньор при избора на употребяван автомобил.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a href="tel:+359888570037" className="group flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 text-black font-black rounded-full hover:bg-emerald-400 transition-all text-xl">
                <span>0888 570 037</span>
              </a>
              <a href="mailto:info@fileverified.eu" className="flex items-center justify-center gap-3 px-10 py-5 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-all text-xl font-bold text-white">
                <span>info@fileverified.eu</span>
              </a>
            </div>
            
            <div className="mt-12 pt-12 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-zinc-500">
              <div>📍 Базиран в София</div>
              <div>🌍 Пътувам в цялата страна</div>
              <div className="col-span-2 md:col-span-1">🛡️ Независима експертиза</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} FileVerified.eu. Всички права запазени.</p>
      </footer>
    </main>
  );
}