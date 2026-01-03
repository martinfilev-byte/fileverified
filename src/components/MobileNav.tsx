"use client" // Задължително за компоненти с интеракция (state)

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Затваря менюто автоматично, когато сменим страницата
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Забранява скролването на задния фон, когато менюто е отворено
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* HAMBURGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* BACKDROP OVERLAY (Тъмен фон) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDE MENU PANEL */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
          {/* Logo inside menu */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">Меню</span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-6">
            <NavLink href="/" label="Начало" current={pathname === "/"} />
            <NavLink href="/services" label="Проверка" current={pathname === "/services"} />
            <NavLink href="/diagnostics" label="Диагностика" current={pathname === "/diagnostics"} />
            <NavLink href="/tpms" label="TPMS" current={pathname === "/tpms"} />
            <NavLink href="/faq" label="FAQ" current={pathname === "/faq"} />
          </nav>

          {/* Call to Action Button */}
          <div className="mt-auto pt-8">
            <Link
              href="/book"
              className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
            >
              Запази оглед
            </Link>
            
            <div className="mt-6 text-center text-xs text-slate-400">
              © 2026 FileVerified
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Помощен компонент за линковете
function NavLink({ href, label, current }: { href: string; label: string; current: boolean }) {
  return (
    <Link
      href={href}
      className={`text-lg font-medium transition-colors ${
        current ? "text-emerald-600" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  )
}