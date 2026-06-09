import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SearchSection } from "@/components/sections/search-section";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, DEFAULT_LOCALE, isValidLocale, type LocaleCode } from "@/lib/i18n/locales";
import { getTranslations } from "@/lib/i18n/translations";

export const metadata = {
  title: "Find a Professional — AssistILL",
  description:
    "Search and filter verified professionals across Israel by category, city, language, and specialty.",
};

export default async function SearchPage() {
  // Server-side locale for the static hero band
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: LocaleCode = raw && isValidLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getTranslations(locale);

  return (
    <>
      {/* ── Mini hero band ────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden bg-[#0f172a] py-10 sm:py-14"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.nav.findMatch === "Find a Match" ? "Back to home" : t.nav.howItWorks}
          </Link>

          <h1 className="font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-3xl">
            {t.search.title}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t.search.subtitle}
          </p>
        </div>
      </div>

      {/* ── Search interface (client component reads ?category= from URL) ── */}
      <Suspense
        fallback={
          <div className="bg-slate-50 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4 animate-pulse">
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-52 rounded-2xl bg-slate-200" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <SearchSection />
      </Suspense>
    </>
  );
}
