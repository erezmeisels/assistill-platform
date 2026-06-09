import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  LOCALE_COOKIE, DEFAULT_LOCALE, isValidLocale, getDir, type LocaleCode,
} from "@/lib/i18n/locales";
import { getTranslations } from "@/lib/i18n/translations";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AssistILL — Your Trusted Partner in Israel",
  description:
    "AssistILL is a premium marketplace connecting clients with top-tier professionals across Israel for business, legal, translation, logistics, and personal assistance.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read locale server-side so lang + dir are SSR-correct
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: LocaleCode = raw && isValidLocale(raw) ? raw : DEFAULT_LOCALE;
  const dir = getDir(locale);
  const t = getTranslations(locale);

  return (
    <html lang={locale} dir={dir} className={`${geist.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <Providers initialLocale={locale}>
          {/* ─── Navbar ─────────────────────────────────────────────────── */}
          <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
              {/* Logo */}
              <a href="/" className="flex items-center select-none">
                <Image
                  src="/logo.png"
                  alt="AssistILL"
                  width={200}
                  height={54}
                  priority
                  className="h-12 w-auto"
                />
              </a>

              {/* Nav links */}
              <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 sm:flex">
                <a href="#how-it-works" className="hover:text-[#0f172a] transition-colors">
                  {t.nav.howItWorks}
                </a>
                <a href="#search" className="hover:text-[#0f172a] transition-colors">
                  {t.nav.findMatch}
                </a>
              </nav>

              {/* CTAs + language switcher */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <a
                  href="#search"
                  className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors sm:inline-flex"
                >
                  {t.nav.signIn}
                </a>
                <a
                  href="/join"
                  className="rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap"
                >
                  {t.nav.becomePartner}
                </a>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* ─── Footer ─────────────────────────────────────────────────── */}
          <footer className="border-t border-slate-800 bg-[#0f172a] py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="flex items-center">
                  <Image
                    src="/logo-white.png"
                    alt="AssistILL"
                    width={120}
                    height={32}
                    className="h-8 w-auto opacity-90"
                  />
                </div>
                <p className="text-xs text-slate-400">{t.footer.tagline}</p>
                <p className="text-xs text-slate-500">
                  © {new Date().getFullYear()} AssistILL. {t.footer.rights}
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
