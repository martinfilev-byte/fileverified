"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="md:hidden">
      {/* Бутонът в хедъра - по-малък и дискретен */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center p-2 text-slate-700"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ПАНЕЛ - Вече със 100% плътен бял фон */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header вътре в менюто */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
            <span className="font-bold tracking-tight text-slate-900">МЕНЮ</span>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="h-6 w-6 text-slate-500" />
            </button>
          </div>

          {/* Линкове - по-големи от предишните, но не огромни */}
          <nav className="flex flex-col p-6 gap-2">
            {[
              { name: "НАЧАЛО", href: "/" },
              { name: "ПРОВЕРКА", href: "/services" },
              { name: "ДИАГНОСТИКА", href: "/diagnostics" },
              { name: "TPMS", href: "/tpms" },
              { name: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-4 text-base font-semibold border-b border-slate-50 transition-colors ${
                  pathname === item.href ? "text-emerald-600" : "text-slate-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/book" 
              className="mt-8 w-full text-center rounded-lg bg-emerald-600 py-4 text-base font-bold text-white shadow-md active:bg-emerald-700 transition-all"
            >
              ЗАПАЗИ ОГЛЕД
            </Link>
          </nav>

          <div className="mt-auto p-8 text-center text-[10px] tracking-[0.2em] text-slate-300 uppercase">
            Professional Auto Inspection
          </div>
        </div>
      </div>
    </div>
  )
}