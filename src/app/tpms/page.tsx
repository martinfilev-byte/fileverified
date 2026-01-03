import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TPMS обучение и програмиране | FileVerified",
  description:
    "Обучение, диагностика и програмиране на TPMS датчици за гуми. Проверка на налягане, сензори и предупреждения в автомобила.",
}

export default function TPMSPage() {
  return (
    <section className="space-y-12">
      {/* HERO */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          TPMS – диагностика и програмиране на датчици за гуми
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Проверка, обучение и програмиране на TPMS (Tire Pressure Monitoring
          System) датчици. Услугата е подходяща при смяна на гуми, джанти,
          повреден датчик или светнала TPMS индикация.
        </p>
      </div>

      {/* WHAT IS TPMS */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Какво представлява TPMS системата?
          </h2>
          <p className="text-slate-600">
            TPMS е система за следене на налягането в гумите, която използва
            сензори (датчици), монтирани във всяка гума. Те измерват налягането и
            температурата и подават информация към автомобила.
          </p>
          <p className="text-slate-600">
            При проблем със системата на таблото се появява предупредителна
            индикация, която не бива да се игнорира.
          </p>
        </div>

        <div className="rounded-2xl border bg-emerald-50 p-6">
          <ul className="space-y-3 text-slate-700">
            <li>• Повишена безопасност при шофиране</li>
            <li>• По-равномерно износване на гумите</li>
            <li>• По-нисък разход на гориво</li>
            <li>• Ранно откриване на проблеми</li>
          </ul>
        </div>
      </div>

      {/* WHEN NEEDED */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Кога е необходимо обучение или програмиране на TPMS?
        </h2>
        <ul className="grid gap-3 md:grid-cols-2 text-slate-600">
          <li>• След смяна на гуми или джанти</li>
          <li>• При подмяна на TPMS датчик</li>
          <li>• При постоянно светнала TPMS лампа</li>
          <li>• При грешки в системата</li>
          <li>• При несъответствие на показанията</li>
        </ul>
      </div>

      {/* WHAT WE DO */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Какво включва услугата
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="font-semibold text-slate-900">
              Диагностика на TPMS
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Проверка на състоянието на датчиците, батерии, комуникация и грешки
              в системата.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="font-semibold text-slate-900">
              Обучение на датчици
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Свързване на датчиците с автомобила след смяна или ротация на
              колелата.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="font-semibold text-slate-900">
              Програмиране / клониране
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Програмиране на нови TPMS датчици или клониране на оригиналните.
            </p>
          </div>
        </div>
      </div>

      {/* NOTE */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm text-amber-800">
          ℹ️ Не всички TPMS проблеми са свързани с налягането. Често причината е
          изтощена батерия на датчик, грешка в обучението или несъвместим сензор.
        </p>
      </div>
    </section>
  )
}