import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import MobileNav from "@/components/MobileNav"

export const metadata: Metadata = {
  title: "FileVerified — Проверка на автомобил преди покупка",
  description:
    "Независима проверка на автомобил преди покупка в София. Реално състояние, без изненади.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <img
                  src="/logo-green.png"
                  alt="FileVerified"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-8 md:flex">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Начало
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Услуги
                </Link>
                <Link
                  href="/faq"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  FAQ
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Запази оглед
                </Link>
              </nav>

              {/* Mobile menu button + drawer */}
              <MobileNav />
            </div>
          </div>
        </header>

        {/* DEVELOPMENT NOTICE */}
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto max-w-7xl px-6 py-2 text-sm text-amber-800">
            ℹ️ Сайтът е в процес на разработка. Възможни са промени и временни
            неточности.
          </div>
        </div>

        {/* MAIN */}
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <Link href="/" className="inline-flex items-center">
                  <img
                    src="/logo-green.png"
                    alt="FileVerified"
                    className="h-8 w-auto"
                  />
                </Link>

                <p className="text-sm text-slate-600">
                  Независима проверка на автомобил преди покупка. Реално
                  състояние, без изненади.
                </p>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Навигация</div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Начало
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Услуги
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/book"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Запази оглед
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Контакт</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>📍 София</li>
                  <li>📞 След заявка</li>
                  <li>✉️ info@fileverified.eu</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} FileVerified.eu · Всички права
              запазени
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}