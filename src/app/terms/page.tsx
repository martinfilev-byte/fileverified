import type { Metadata } from "next"
import { Scale } from "lucide-react"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Общи условия | FileVerified",
  description: "Общи условия за ползване на услугите на FileVerified - независима проверка на автомобили.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center gap-3 mb-8 text-emerald-600 border-b pb-6">
          <Scale className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-slate-900">Общи условия</h1>
        </div>

        <div className="space-y-12 text-slate-600 leading-relaxed">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Предмет</h2>
              <p>
                Настоящите Общи условия уреждат отношенията между Мартин Филев, наричан по-долу „Изпълнител“, 
                и потребителите на услугите, предлагани чрез уебсайта <strong>fileverified.eu</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Описание на услугите</h2>
              <p>Изпълнителят предоставя независима експертна оценка на техническото състояние на употребявани автомобили, включваща диагностика, оглед и тест-драйв.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Резервации</h2>
              <p>
                Заявка за оглед се счита за потвърдена само след личен контакт по телефон или писмено потвърждение от наша страна.
              </p>
            </section>
          </div>

          {/* КОНТАКТНА ФОРМА */}
          <div className="mt-20 pt-12 border-t">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Имате въпроси?</h2>
              <p className="text-slate-500">Ако не намирате отговор в общите ни условия, пишете ни директно.</p>
            </div>
            <ContactForm />
          </div>

          <div className="pt-8 text-sm text-slate-400">
            Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
          </div>
        </div>
      </div>
    </div>
  )
}