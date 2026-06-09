"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { LOCALES, type LocaleCode } from "@/lib/i18n/locales";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslations();
  const [open, setOpen]       = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all",
          open
            ? "border-slate-300 bg-slate-50 text-[#0f172a]"
            : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-[#0f172a]"
        )}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden font-semibold tracking-wide sm:block">
          {current.code.toUpperCase()}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-900/[0.08]"
        >
          {/* Header */}
          <div className="border-b border-slate-50 px-4 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Language
            </p>
          </div>

          <div className="py-1">
            {LOCALES.map((loc) => {
              const isActive = loc.code === locale;
              return (
                <button
                  key={loc.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => { setLocale(loc.code as LocaleCode); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-slate-50 text-[#0f172a]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0f172a]"
                  )}
                >
                  <span className="w-5 text-center text-base leading-none">{loc.flag}</span>
                  <span className={cn("flex-1 text-left", isActive && "font-semibold")}>
                    {loc.label}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">
                    {loc.code.toUpperCase()}
                  </span>
                  {isActive && <Check className="h-3.5 w-3.5 text-[#0f172a]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
