const PACKAGES = [
  {
    name: "Basic",
    price: "159 лв",
    duration: "60–75 мин",
    description: "Бърза и практична проверка за базова сигурност.",
    features: [
      "Компютърна диагностика (основни модули)",
      "Визуален оглед (двигател/окачване/течове)",
      "Кратко обобщение: плюсове/минуси",
    ],
    cta: "Запази Basic",
    highlight: false,
  },
  {
    name: "Full",
    price: "299 лв",
    duration: "90–120 мин",
    description: "Най-избираният пакет — най-добър баланс цена/покритие.",
    features: [
      "Всичко от Basic",
      "Проверка на боя (дебелина) и панели",
      "Проверка на гуми/джанти/спирачки (визуално)",
      "Оценка на реалното състояние и рискове",
    ],
    cta: "Запази Full",
    highlight: true,
  },
  {
    name: "Premium",
    price: "349 лв",
    duration: "120–150 мин",
    description: "Максимално подробен оглед + доклад за спокойствие.",
    features: [
      "Всичко от Full",
      "По-детайлен доклад с препоръки",
      "Приоритетна комуникация (обаждане след оглед)",
      "Снимки/забележки по ключови точки",
    ],
    cta: "Запази Premium",
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Услуги и цени</h1>
        <p className="text-slate-600 text-lg">
          Избери пакет според нуждите си. Ако се колебаеш — препоръчваме <span className="font-semibold">Full</span>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.name}
            className={[
              "rounded-2xl border bg-white p-6 shadow-sm",
              p.highlight ? "border-emerald-200 ring-1 ring-emerald-100" : "",
            ].join(" ")}
          >
            {p.highlight && (
              <div className="mb-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Препоръчан
              </div>
            )}

            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">{p.name}</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{p.price}</div>
                <div className="text-xs text-slate-500">{p.duration}</div>
              </div>
            </div>

            <p className="mt-3 text-slate-600">{p.description}</p>

            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="/book"
              className={[
                "mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 font-semibold transition",
                p.highlight
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border bg-white text-slate-900 hover:bg-slate-50",
              ].join(" ")}
            >
              {p.cta}
            </a>

            <div className="mt-3 text-xs text-slate-500">
              * Цените са ориентировъчни. Финалната цена може да зависи от локация/сложност.
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-emerald-50 p-8">
        <h3 className="text-xl font-bold text-slate-900">Как протича огледът?</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5">
            <div className="text-sm font-semibold text-emerald-700">1) Заявка</div>
            <div className="mt-1 text-slate-700 text-sm">
              Избираш пакет и изпращаш данните за автомобила.
            </div>
          </div>
          <div className="rounded-xl bg-white p-5">
            <div className="text-sm font-semibold text-emerald-700">2) Оглед</div>
            <div className="mt-1 text-slate-700 text-sm">
              Правим проверката на място — при продавача или сервиз.
            </div>
          </div>
          <div className="rounded-xl bg-white p-5">
            <div className="text-sm font-semibold text-emerald-700">3) Обобщение</div>
            <div className="mt-1 text-slate-700 text-sm">
              Получаваш ясно мнение и препоръка “струва ли си”.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}