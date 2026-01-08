import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Facebook, Phone, MessageCircle, FileText, ShieldCheck, Mail, MapPin } from "lucide-react"
import "./globals.css"
import MobileNav from "@/components/MobileNav"

export const metadata: Metadata = {
  title: "Проверка на автомобил преди покупка в София | FileVerified",
  description:
    "Независима професионална проверка на автомобил преди покупка. Компютърна диагностика, оглед на купе и тест драйв. Спестете си излишни разходи!",
  keywords: ["проверка на кола", "оглед на автомобил София", "диагностика на кола", "автоексперт", "реални километри", "преглед преди покупка"],
  metadataBase: new URL("https://fileverified.eu"),
  alternates: {
    canonical: "/",
  },
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
    description: "Вижте реалното състояние на автомобила, преди да платите. Професионална диагностика в София.",
    url: "https://fileverified.eu",
    siteName: "FileVerified",
    images: [
      {
        url: "/og-image.jpg", // Увери се, че имаш такова изображение в /public
        width: 1200,
        height: 630,
        alt: "FileVerified Car Inspection",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileVerified - Проверка на автомобили",
    description: "Независима проверка на кола преди покупка в София.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fbLink = "https://www.facebook.com/profile.php?id=61585477671669"
  const whatsappLink = "https://wa.me/359888570037"
  const viberLink = "viber://chat?number=%2B359888570037"

  return (
    <html lang="bg" className="scroll-smooth">
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
      <body className="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between gap-4">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
                <Image 
                  src="/logo-green.png" 
                  alt="FileVerified Logo" 
                  width={180} 
                  height={40} 
                  className="h-8 w-auto"
                  priority
                />
              </Link>

              <nav className="hidden items-center gap-6 md:flex">
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">Начало</Link>
                <Link href="/services" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">Проверка</Link>
                <Link href="/diagnostics" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">Диагностика</Link>
                <Link href="/tpms" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">TPMS</Link>
                
                <Link href="/report" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:bg-emerald-100 bg-emerald-50 px-3 py-1.5 rounded-lg transition-all">
                  <FileText className="w-4 h-4" /> Примерен доклад
                </Link>

                <Link href="/faq" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">FAQ</Link>

                <a href={fbLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="ml-2 text-slate-400 hover:text-[#1877F2] transition-colors">
                  <Facebook className="h-5 w-5 fill-current" />
                </a>

                <Link href="/book" className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-100 active:scale-95">
                  Запази оглед
                </Link>
              </nav>

              <MobileNav />
            </div>
          </div>
        </header>

        {/* ANNOUNCEMENT BANNER */}
        <div className="border-b border-amber-200 bg-amber-50/50">
          <div className="mx-auto max-w-7xl px-6 py-2 text-xs md:text-sm text-amber-800 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Сайтът е в процес на разработка. Очаквайте скоро пълната функционалност!
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-grow mx-auto w-full max-w-7xl px-6 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-12 md:grid-cols-4">
              <div className="md:col-span-1 space-y-6">
                <Link href="/" className="inline-flex items-center">
                  <Image src="/logo-green.png" alt="FileVerified" width={160} height={36} className="h-8 w-auto" />
                </Link>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Професионална помощ при избор на употребяван автомобил. <br />
                  Вашата сигурност е наш приоритет.
                </p>
                <div className="flex items-center gap-4">
                  <a href={fbLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-[#1877F2] transition-all transform hover:scale-110"><Facebook className="h-6 w-6 fill-current" /></a>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-slate-400 hover:text-[#25D366] transition-all transform hover:scale-110"><MessageCircle className="h-6 w-6 fill-current" /></a>
                  <a href={viberLink} aria-label="Viber" className="text-slate-400 hover:text-[#7360F2] transition-all transform hover:scale-110"><Phone className="h-6 w-6" /></a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-[0.2em] mb-6">Услуги</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/services" className="text-slate-600 hover:text-emerald-600 transition-colors">Оглед на място</Link></li>
                  <li><Link href="/diagnostics" className="text-slate-600 hover:text-emerald-600 transition-colors">Компютърна диагностика</Link></li>
                  <li><Link href="/tpms" className="text-slate-600 hover:text-emerald-600 transition-colors">Проверка на TPMS</Link></li>
                  <li><Link href="/report" className="text-emerald-600 font-bold hover:underline">Примерен доклад</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-[0.2em] mb-6">Полезно</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/faq" className="text-slate-600 hover:text-emerald-600 transition-colors">Често задавани въпроси</Link></li>
                  <li><Link href="/terms" className="text-slate-600 hover:text-emerald-600 transition-colors text-xs">Общи условия</Link></li>
                  <li><Link href="/privacy" className="text-slate-600 hover:text-emerald-600 transition-colors text-xs">Поверителност</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-[0.2em] mb-6">Контакт</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>гр. София и околността</span>
                  </li>
                  <li>
                    <a href="tel:0888570037" className="flex items-center gap-3 hover:text-emerald-600 transition-colors font-bold text-slate-900 group">
                      <Phone className="w-5 h-5 text-emerald-600 group-hover:animate-bounce" />
                      0888 57 00 37
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@fileverified.eu" className="flex items-center gap-3 hover:text-emerald-600 transition-colors text-slate-600">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      info@fileverified.eu
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                © {new Date().getFullYear()} FileVerified.eu. Всички права запазени.
              </p>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                  Independent Car Inspection
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}