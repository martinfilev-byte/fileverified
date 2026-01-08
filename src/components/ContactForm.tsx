"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Тук по-късно ще добавим логиката за изпращане на мейл
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center">
        <div className="flex justify-center mb-4 text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Благодарим Ви!</h3>
        <p className="text-slate-600">Вашето съобщение беше изпратено успешно. Ще се свържем с Вас съвсем скоро.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-emerald-600 font-semibold hover:underline"
        >
          Изпрати друго съобщение
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Свържете се с нас</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Име</label>
            <input 
              required
              type="text" 
              placeholder="Вашето име"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Телефон</label>
            <input 
              required
              type="tel" 
              placeholder="08XX XXX XXX"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Съобщение</label>
          <textarea 
            required
            rows={4}
            placeholder="Опишете накратко как можем да Ви помогнем..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          Изпрати запитване
        </button>
      </form>
    </div>
  )
}