"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react" // Използваме икони за по-професионален вид

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
      {/* Бутонът, който винаги е видим в хедъра */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-600"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Самото меню, което изскача над всичко */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-600"
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-2xl font-bold text-slate-900">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Начало</Link>
            <Link href="/services" className="hover:text-emerald-600 transition-colors">Проверка</Link>
            <Link href="/diagnostics" className="hover:text-emerald-600 transition-colors">Диагностика</Link>
            <Link href="/tpms" className="hover:text-emerald-600 transition-colors">TPMS</Link>
            <Link href="/faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
            <Link 
              href="/book" 
              className="mt-4 w-full text-center rounded-2xl bg-emerald-600 py-4 text-white shadow-xl"
            >
              Запази оглед
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}