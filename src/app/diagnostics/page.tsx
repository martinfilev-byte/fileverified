import Link from "next/link"

export const metadata = {
  title: "Компютърна диагностика | FileVerified",
  description:
    "Пълна компютърна диагностика на автомобил — четене на грешки, live data, тестове и ясно обяснение. София.",
}

export default function DiagnosticsPage() {
  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Диагностика • OBD • Модули
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Пълна компютърна диагностика
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl">
            Четем грешки от управляващите модули, проверяваме live данни и
            статуса на системите. Най-важното: получаваш ясно обяснение кое е
            реален проблем, кое е „старо“ и кое е симптом.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              Запази оглед
            </Link>
            <div className="text-sm text-slate-500">
              Онлайн запазването е временно ограничено — потвърждението е по
              телефон.
            </div>
          </div>
        </div>
      </div>

      {/* What you get */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Какво проверяваме">
          ECU (двигател), трансмисия, ABS/ESP, airbag, климатроник, комфорт,
          body/BCM, табло, TPMS (ако има), както и други модули според
          автомобила.
        </Card>

        <Card title="Какво получаваш">
          Списък на грешките, статус (активна/историческа), ключови live данни и
          насоки за следващи стъпки: ремонт, тест, или наблюдение.
        </Card>

        <Card title="Защо е важно">
          Много „светнали лампи“ са симптом. Диагностиката помага да не сменяш
          части на сляпо и да разбереш реалната причина.
        </Card>
      </div>

      {/* Included */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Какво включва услугата
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Bullet
            title="Сканиране на модули"
            text="Четене на грешки от наличните системи според оборудването."
          />
          <Bullet
            title="Live data"
            text="Проверка на ключови параметри в реално време (температури, сензори, налягания и др.)."
          />
          <Bullet
            title="Статус и логика"
            text="Разграничаваме активни от исторически грешки и търсим причинно-следствени връзки."
          />
          <Bullet
            title="Изчистване (при смисъл)"
            text="Изчистваме само когато има логика (след тест/проверка), не „за да изгасне лампата“."
          />
        </div>

        <div className="rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
          <div className="font-semibold">Важно</div>
          <div className="mt-1 text-amber-900/80">
            Диагностиката не е „магия“ — при някои проблеми се изискват
            допълнителни тестове (механични проверки, дим тест, измервания и
            т.н.). Целта е да стесним причината и да избегнем излишни ремонти.
          </div>
        </div>
      </div>

      {/* When */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Кога има смисъл">
          Светнала лампа, придърпване, загуба на мощност, повишен разход,
          неправилно превключване, проблеми с ABS/ESP, грешки след ремонт.
        </Card>
        <Card title="При покупка">
          Супер полезно е като част от проверка преди покупка — виждаме какво
          е пипано/изчиствано и дали има активни проблеми.
        </Card>
        <Card title="След обслужване">
          Ако е правен ремонт/обслужване — диагностиката потвърждава дали
          всичко е наред и няма остатъчни грешки.
        </Card>
      </div>
    </section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="text-lg font-bold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  )
}

function Bullet({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{text}</div>
    </div>
  )
}