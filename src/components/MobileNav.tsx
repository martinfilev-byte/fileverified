"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Проверка дали сме в браузъра (клиентска част)
  useEffect(() => {
    setMounted(true)
  }, [])

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

  const menuContent = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: isOpen ? 'block' : 'none',
      }}
    >
      {/* Плътен фон за застраховка */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: 0.95, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      />
      
      <div className="relative flex flex-col h-full w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
          <span className="font-bold text-lg text-slate-900">МЕНЮ</span>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full">
            <X className="h-6 w-6 text-slate-900" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col p-8 gap-1 overflow-y-auto">
          {[
            { name: "НАЧАЛО", href: "/" },
            { name: "ПРОВЕРКА", href: "/services" },
            { name: "ДИАГНОСТИКА", href: "/diagnostics" },
            { name: "TPMS", href: "/tpms" },
            { name: "КОНТАКТИ", href: "/contact" },
            { name: "FAQ", href: "/faq" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-4 text-xl font-bold border-b border-slate-50 ${
                pathname === item.href ? "text-emerald-600" : "text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="mt-8 flex flex-col gap-4">
            <Link 
              href="/book" 
              className="w-full text-center rounded-xl bg-emerald-600 py-5 text-lg font-black text-white shadow-lg"
            >
              ЗАПАЗИ ОГЛЕД
            </Link>

            <div className="grid grid-cols-2 gap-3">
                <Link 
                    href="/portal" 
                    className="w-full text-center rounded-xl bg-slate-100 py-4 text-xs font-black text-slate-900 uppercase tracking-widest"
                >
                    ПОРТАЛ
                </Link>
                <Link 
                    href="/admin" 
                    className="w-full text-center rounded-xl bg-slate-900 py-4 text-xs font-black text-white uppercase tracking-widest"
                >
                    АДМИН
                </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 text-slate-900">
        <Menu className="h-6 w-6" />
      </button>

      {/* Рендираме менюто директно в body, за да не се влияе от хедъра */}
      {mounted && createPortal(menuContent, document.body)}
    </div>
  )
}