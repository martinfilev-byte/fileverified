import Link from "next/link"
import { 
  CheckCircle2, 
  AlertCircle, 
  CalendarCheck, 
  CarFront, 
  ClipboardCheck, 
  Sparkles,
  ThermometerSnowflake 
} from "lucide-react"

export const metadata = {
  title: "Често задавани въпроси | FileVerified",
  description:
    "Отговори на най-често задаваните въпроси за оглед на автомобил преди покупка в София.",
}

const PREP_STEPS = [
  {
    title: "Потвърдете наличността",
    text: "Уверете се, че автомобилът все още се продава и не е капариран.",
    icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />
  },
  {
    title: "Вземете съгласие за инспекция",
    text: "Продавачът трябва да е съгласен за компютърна диагностика и мерене на боята.",
    icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" />
  },
  {
    title: "Проверете за тест-драйв",
    text: "Попитайте дали колата има номера и застраховка, за да бъде тествана в движение.",
    icon: <CarFront className="w-5 h-5 text-emerald-600" />
  },
  {
    title: "Помолете за чист автомобил",
    text: "На мръсна кола не могат да се видят дефекти по лака и фини драскотини.",
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />
  },
  {
    title: "Изисквайте студен старт",
    text: "Помолете продавача да не пали колата преди огледа, за да чуем реалния студен старт.",
    icon: <ThermometerSnowflake className="w-5 h-5 text-emerald-600" />
  }
]

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Защо да поръчам оглед преди покупка?",
    a: "За да вземеш решение на база факти: реално състояние, диагностика, следи от ПТП/ремонти, потенциални скрити разходи и рискове.",
  },
  {
    q: "Какво включва огледът?",
    a: "Комбинация от визуална проверка (кузов, боя, салон), диагностика (OBD), проверка на ключови системи и обобщение с препоръка.",
  },
  {
    q: "Правите ли оглед на място в София?",
    a: "Да – огледът е мобилен и се прави на мястото, където е автомобилът.",
  },
  {
    q: "Кога получавам резултат/доклад?",
    a: "След огледа получаваш обобщение. Подробният доклад се изпраща допълнително.",
  },
]

export default function FAQPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6 space-y-16">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Често задавани въпроси
        </h1>
        <p className="text-slate-600 text-xl leading-relaxed">
          Всичко, което трябва да знаете за професионалния оглед на автомобил.
        </p>
      </div>

      <div className="bg-emerald-50 rounded-[2.5rem] p-8 md:p-12 border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <AlertCircle className="w-8 h-8 text-emerald-600" />
          <h2 className="text-2xl font-bold text-emerald-900">
            5 стъпки ПРЕДИ да поръчате оглед
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {PREP_STEPS.map((step, idx) => (
            <div key={idx} className="flex gap-4 bg-white/60 p-5 rounded-2xl border border-white">
              <div className="bg-white p-2.5 rounded-xl shadow-sm h-fit">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-snug">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 px-2">Всички въпроси</h2>
        <div className="rounded-3xl border bg-white p-2 shadow-xl shadow-slate-200/50 overflow-hidden">
          {FAQS.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl p-4 hover:bg-slate-50 open:bg-emerald-50/30 transition-all duration-300"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-bold text-slate-900 text-lg leading-tight group-open:text-emerald-900">
                    {item.q}
                  </div>
                  <div className="mt-0.5 text-emerald-600 font-black select-none text-2xl">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </div>
                </div>
              </summary>
              <div className="mt-4 text-slate-700 leading-relaxed text-md pl-1 border-t border-emerald-100/50 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-10 md:p-14 text-center md:text-left relative overflow-hidden shadow-2xl shadow-slate-200/50">
        <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">
            Не намирате отговора?
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-xl font-medium">
            Пишете ни в заявката или ни се обадете директно.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
            <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 font-black text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 text-lg uppercase tracking-tighter"
            >
                ЗАПАЗЕТЕ ОГЛЕД
            </Link>
            <a
                href="tel:0888570037"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-50 px-8 py-4 font-bold text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
            >
                0888 57 00 37
            </a>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>
    </section>
  )
}