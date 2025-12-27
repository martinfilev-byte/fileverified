"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type NavItem = { href: string; label: string; primary?: boolean }

const NAV: NavItem[] = [
  { href: "/", label: "Начало" },
  { href: "/services", label: "Услуги" },
  { href: "/faq", label: "FAQ" },
  { href: "/book", label: "Запази оглед", primary: true },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {/* Hamburger button (mobile only) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex md:hidden items-center justify-center rounded-xl border bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        aria-label="Отвори меню"
      >
        <span className="sr-only">Меню</span>
        <span className="flex flex-col gap-1">
          <span className="h-0.5 w-5 bg-slate-900" />
          <span className="h-0.5 w-5 bg-slate-900" />
          <span className="h-0.5 w-5 bg-slate-900" />
        </span>
      </button>

      {/* Overlay + Drawer */}
      {open && (
        <div className="fixed inset-0 z-[999] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Затвори меню"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="font-semibold text-slate-900">Меню</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                aria-label="Затвори"
              >
                ✕
              </button>
            </div>

            <nav className="p-5 space-y-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                    item.primary
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border bg-white text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 text-xs text-slate-500">
                Натисни <span className="font-semibold">Esc</span> за затваряне.
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}