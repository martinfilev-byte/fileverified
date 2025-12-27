import Link from "next/link"

export default function HomePage() {
  return (
    <section className="space-y-20">
      {/* HERO */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Независима проверка на автомобил преди покупка.
            <span className="block text-emerald-700">
              Реално състояние, без изненади.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl">
            Професионален оглед на място в София — диагностика, проверка на боя,
            реално техническо състояние и ясна препоръка, без интерес от
            продажбата.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
            >
              Запази оглед
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              Виж услугите
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border shadow-sm">
            <img
              src="/images/hero-inspection.png"
              alt="Професионален оглед на автомобил преди покупка"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div className="grid gap-6 md:grid-cols-3">
        <TrustCard
          title="Независим оглед"
          text="Нямаме интерес от продажбата на автомобила. Получаваш обективна и честна оценка."
        />
        <TrustCard
          title="Реални факти"
          text="Проверка на състояние, диагностика и следи от ремонти — без догадки."
        />
        <TrustCard
          title="Ясна препоръка"
          text="В края знаеш дали автомобилът си струва или е по-добре да го пропуснеш."
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="space-y-10">
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

      {/* CTA */}
      <div className="rounded-3xl border bg-emerald-50 p-10 text-center space-y-6">
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
            className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-700 transition"
          >
            Запази оглед
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --- Components --- */

function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  )
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
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