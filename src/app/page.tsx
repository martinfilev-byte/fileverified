import Link from "next/link"

export default function HomePage() {
  return (
    <section className="space-y-20">
      {/* HERO SECTION */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center px-6 pt-10">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Независима проверка на автомобил преди покупка.
            <span className="block text-emerald-700">
              Вижте реалното състояние, спестете си изненадите.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl">
            Купете следващия си автомобил с увереност. Ние проверяваме всичко вместо вас – от софтуерни грешки до дебелината на боята. Даваме ви обективната истина за всяка кола в София.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Запази оглед
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 transition transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Виж услугите
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border shadow-sm">
            <img
              src="/images/hero-inspection.png"
              alt="Професионален оглед на автомобил"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* TRUST CARDS */}
      <div className="grid gap-6 md:grid-cols-3 px-6">
        <TrustCard
          title="Независим оглед"
          text="Ние не сме автокъща и не продаваме коли. Нашата цел е да ви дадем 100% обективна и честна оценка за състоянието на избрания от вас автомобил."
        />
        <TrustCard
          title="Реални факти"
          text="Използваме професионални дебеломери за боя и диагностични уреди. Откриваме пребоядисвани детайли, активни грешки и следи от тежки ремонти."
        />
        <TrustCard
          title="Ясна препоръка"
          text="В края на огледа получавате детайлен отчет. Ще разберете дали колата си заслужава инвестицията или е по-добре да продължите търсенето."
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="space-y-10 px-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Как протича огледът
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <StepCard
            step="1"
            title="Заявка"
            text="Избираш пакет, дата и час и описваш автомобила."
          />
          <StepCard
            step="2"
            title="Оглед на място"
            text="Проверка на реалното състояние — визуално, технически и с диагностика."
          />
          <StepCard
            step="3"
            title="Обобщение"
            text="Получаваш ясна оценка и аргументирана препоръка."
          />
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mx-6 rounded-3xl border bg-emerald-50 p-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Готов ли си да провериш автомобила?
        </h2>
        <p className="text-slate-700 max-w-2xl mx-auto">
          Един професионален оглед може да ти спести хиляди левове и много
          главоболия.
        </p>
        <div>
          <Link
            href="/book"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-700 transition transform hover:scale-105 active:scale-95 shadow-md"
          >
            Запази оглед
          </Link>
        </div>
      </div>
    </section>
  )
}

function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-lg font-bold text-[#059669]">{title}</div>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  )
}

function StepCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3 transition-all hover:border-emerald-200">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
          {step}
        </div>
        <div className="text-lg font-semibold text-slate-900">{title}</div>
      </div>
      <p className="text-slate-600">{text}</p>
    </div>
  )
}