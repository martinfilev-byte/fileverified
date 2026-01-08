"use client"

import { useState } from "react"
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4 text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Запитването е изпратено!</h3>
        <p className="text-slate-600">Благодарим Ви, ще се свържем с Вас съвсем скоро.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
        >
          Изпрати ново съобщение
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Бързо запитване</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Вашето Име</label>
            <input 
              name="name"
              required 
              type="text" 
              placeholder="Име и фамилия"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Телефон</label>
            <input 
              name="phone"
              required 
              type="tel" 
              placeholder="0888 000 000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Какво Ви интересува?</label>
          <textarea 
            name="message"
            required
            rows={4}
            placeholder="Опишете накратко как можем да Ви помогнем..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none bg-white"
          ></textarea>
        </div>

        <button 
          disabled={status === "loading"}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === "loading" ? "Изпращане..." : "Изпрати запитване"}
        </button>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 text-sm justify-center mt-2">
            <AlertCircle className="w-4 h-4" />
            Грешка при изпращането. Моля, проверете връзката си.
          </div>
        )}
      </form>
    </div>
  )
}