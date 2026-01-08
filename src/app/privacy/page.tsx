import type { Metadata } from "next"
import { Lock, ShieldCheck } from "lucide-react"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Поверителност | FileVerified",
  description: "Политика за поверителност и защита на личните данни на FileVerified.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center gap-3 mb-8 text-emerald-600 border-b pb-6">
          <Lock className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-slate-900">Политика за поверителност</h1>
        </div>

        <div className="space-y-12 text-slate-600 leading-relaxed">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Лични данни</h2>
              <p>Събираме Вашите имена, телефон и имейл единствено с цел изпълнение на услугата по оглед на автомобил.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Бисквитки</h2>
              <p>Използваме Google Analytics, за да подобряваме работата на сайта. Данните са анонимни.</p>
            </section>

            <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex items-start gap-4 text-emerald-800">
              <ShieldCheck className="w-6 h-6 shrink-0 mt-1" />
              <p className="text-sm font-medium">Никога не споделяме данните Ви с трети лица (автокъщи, продавачи) без Вашето изрично съгласие.</p>
            </section>
          </div>

          {/* КОНТАКТНА ФОРМА */}
          <div className="mt-20 pt-12 border-t">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Вашите права</h2>
              <p className="text-slate-500">По всяко време можете да поискате изтриване на Вашите данни от нашата база чрез формата по-долу.</p>
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