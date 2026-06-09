"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LanguageProvider } from "@/lib/i18n/context";
import type { LocaleCode } from "@/lib/i18n/locales";

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: LocaleCode;
}) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </QueryClientProvider>
  );
}
