"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Хамбургер бутон - стои в хедъра */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[70] md:hidden p-2 text-slate-600"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5 w-6">
          <span className={`h-0.5 w-full bg-slate-900 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-full bg-slate-900 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-full bg-slate-900 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </button>

      {/* Менюто - разпъва се върху целия екран */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl font-semibold text-slate-900">
          <Link href="/" className="hover:text-emerald-600">Начало</Link>
          <Link href="/services" className="hover:text-emerald-600">Проверка</Link>
          <Link href="/diagnostics" className="hover:text-emerald-600">Диагностика</Link>
          <Link href="/tpms" className="hover:text-emerald-600">TPMS</Link>
          <Link href="/faq" className="hover:text-emerald-600">FAQ</Link>
          <Link 
            href="/book" 
            className="mt-4 rounded-xl bg-emerald-600 px-8 py-3 text-white shadow-lg active:scale-95 transition-transform"
          >
            Запази оглед
          </Link>
        </nav>
      </div>
    </>
  )
}