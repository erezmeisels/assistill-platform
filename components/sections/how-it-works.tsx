"use client";

import { Search, Calculator, CalendarCheck } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useTranslations();

  const steps = [
    {
      icon: Search,
      step: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      icon: Calculator,
      step: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      icon: CalendarCheck,
      step: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            {t.howItWorks.badge}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            {t.howItWorks.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">{t.howItWorks.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f172a] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-3xl font-bold text-slate-100 select-none">{step}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-[#0f172a]">{title}</h3>
              <p className="text-sm leading-7 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
