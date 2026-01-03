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
      {/* Хамбургер бутон */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-900 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ПАНЕЛ - Прозрачен с Blur */}
      <div
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9999, 
          backgroundColor: 'rgba(255, 255, 255, 0.92)', // 92% плътност
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out, visibility 0.3s'
        }}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header вътре в менюто */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-200/50">
            <span className="font-bold text-lg tracking-tight text-slate-900">МЕНЮ</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 bg-white/80 rounded-full border border-slate-200 shadow-sm"
            >
              <X className="h-6 w-6 text-slate-900" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col p-8 gap-1">
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
                className={`py-5 text-xl font-bold border-b border-slate-200/30 transition-colors ${
                  pathname === item.href ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/book" 
              className="mt-10 w-full text-center rounded-xl bg-emerald-600 py-5 text-lg font-black text-white shadow-xl active:scale-95 transition-all"
            >
              ЗАПАЗИ ОГЛЕД
            </Link>
          </nav>

          <div className="mt-auto p-10 text-center">
            <p className="text-[10px] font-semibold text-slate-400 tracking-[0.3em] uppercase">
              Professional Auto Inspection
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}