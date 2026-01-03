import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import "./globals.css"
import MobileNav from "@/components/MobileNav"

export const metadata: Metadata = {
  title: "Проверка на автомобил преди покупка в София | FileVerified",
  description:
    "Независима проверка на автомобил преди покупка. Вижте реалното състояние, спестете си изненадите.",
  keywords: ["проверка на кола", "оглед на автомобил София", "диагностика на кола", "автоексперт", "реални километри"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "FileVerified - Независим оглед на автомобили",
    description: "Независима проверка на автомобил преди покупка. Вижте реалното състояние, спестете си изненадите.",
    url: "https://fileverified.eu",
    siteName: "FileVerified",
    locale: "bg_BG",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <head>
        {/* Google tag (gtag.js) */}
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-JTLYG6PTXR" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JTLYG6PTXR');
          `}
        </Script>
      </head>
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
                  Проверка
                </Link>

                <Link
                  href="/diagnostics"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Диагностика
                </Link>

                <Link
                  href="/tpms"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  TPMS
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

              {/* Mobile menu */}
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
                      Проверка
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/diagnostics"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Диагностика
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tpms"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      TPMS
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
              © {new Date().getFullYear()} FileVerified.eu · Всички права запазени
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}