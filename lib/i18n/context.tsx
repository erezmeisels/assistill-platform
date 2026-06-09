"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, DEFAULT_LOCALE, isValidLocale, type LocaleCode } from "./locales";
import { getTranslations, type Translations } from "./translations";

interface LanguageContextValue {
  locale: LocaleCode;
  t: Translations;
  setLocale: (code: LocaleCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLocaleCookie(): LocaleCode {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`));
  const val = match?.[1];
  return val && isValidLocale(val) ? val : DEFAULT_LOCALE;
}

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: LocaleCode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<LocaleCode>(initialLocale);

  // Sync if the server-provided prop changes (after router.refresh())
  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback(
    (code: LocaleCode) => {
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${maxAge};SameSite=Lax`;
      setLocaleState(code);
      router.refresh();
    },
    [router]
  );

  return (
    <LanguageContext.Provider value={{ locale, t: getTranslations(locale), setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslations must be used inside LanguageProvider");
  return ctx;
}
