import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Facebook, Phone, MessageCircle, FileText, ShieldCheck } from "lucide-react"
import "./globals.css"
import MobileNav from "@/components/MobileNav"

export const metadata: Metadata = {
  title: "Проверка на автомобил преди покупка в София | FileVerified",
  description:
    "Независима проверка на автомобил преди покупка. Вижте реалното състояние, спестете си изненадите.",
  keywords: ["проверка на кола", "оглед на автомобил София", "диагностика на кола", "автоексперт", "реални километри"],
  metadataBase: new URL("https://fileverified.eu"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
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
  const fbLink = "https://www.facebook.com/profile.php?id=61585477671669";
  const whatsappLink = "https://wa.me/359888570037";
  const viberLink = "viber://chat?number=%2B359888570037";

  return (
    <html lang="bg">
      <head>
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
              <Link href="/" className="flex items-center">
                <img src="/logo-green.png" alt="FileVerified" className="h-8 w-auto" />
              </Link>

              <nav className="hidden items-center gap-6 md:flex">
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">Начало</Link>
                
                <Link href="/services" className="text-sm font-medium text-slate-700 hover:text-slate-900">Проверка</Link>
                <Link href="/diagnostics" className="text-sm font-medium text-slate-700 hover:text-slate-900">Диагностика</Link>
                <Link href="/tpms" className="text-sm font-medium text-slate-700 hover:text-slate-900">TPMS</Link>
                
                {/* ПРИМЕРЕН ДОКЛАД */}
                <Link href="/report" className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" /> Примерен доклад
                </Link>

                <Link href="/faq" className="text-sm font-medium text-slate-700 hover:text-slate-900">FAQ</Link>

                <a href={fbLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-slate-400 hover:text-[#1877F2] transition-colors">
                  <Facebook className="h-5 w-5 fill-current" />
                </a>

                <Link href="/book" className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-sm shadow-emerald-200">
                  Запази оглед
                </Link>
              </nav>

              <MobileNav />
            </div>
          </div>
        </header>

        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto max-w-7xl px-6 py-2 text-sm text-amber-800 flex items-center gap-2">
            <span className="animate-pulse">ℹ️</span> Сайтът е в процес на разработка.
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-4">
                <Link href="/" className="inline-flex items-center">
                  <img src="/logo-green.png" alt="FileVerified" className="h-8 w-auto" />
                </Link>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Независима проверка на автомобили. <br />
                  Професионална диагностика и огледи.
                </p>
                <div className="flex items-center gap-4">
                  <a href={fbLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877F2] transition-all"><Facebook className="h-6 w-6 fill-current" /></a>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#25D366] transition-all"><MessageCircle className="h-6 w-6 fill-current" /></a>
                  <a href={viberLink} className="text-slate-400 hover:text-[#7360F2] transition-all"><Phone className="h-6 w-6" /></a>
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-900 uppercase text-[10px] tracking-widest mb-4">Навигация</div>
                <ul className="space-y-2 text-sm font-medium">
                  <li><Link href="/" className="text-slate-600 hover:text-slate-900">Начало</Link></li>
                  <li><Link href="/services" className="text-slate-600 hover:text-slate-900">Оглед на кола</Link></li>
                  <li><Link href="/diagnostics" className="text-slate-600 hover:text-slate-900">Компютърна диагностика</Link></li>
                  <li><Link href="/tpms" className="text-slate-600 hover:text-slate-900">TPMS сензори</Link></li>
                  <li><Link href="/report" className="text-emerald-600 font-bold hover:underline">Примерен доклад</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-slate-900 uppercase text-[10px] tracking-widest mb-4">Контакт</div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2 font-medium">📍 гр. София</li>
                  <li>
                    <a href="tel:0888570037" className="flex items-center gap-2 hover:text-emerald-600 transition-colors font-bold text-slate-900">
                      📞 0888 57 00 37
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@fileverified.eu" className="flex items-center gap-2 hover:text-emerald-600 transition-colors font-medium">
                      ✉️ info@fileverified.eu
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest">
              <span>© {new Date().getFullYear()} FileVerified.eu</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                <span className="font-black text-slate-300 italic">Independent Car Inspection</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}